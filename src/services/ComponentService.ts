import { getCustomRepository, ILike, In, Raw, Repository } from 'typeorm';

import { Component } from '../entities/Component';
import { ComponentRepository } from '../repositories/ComponentRepository';
import { AppError } from '../errors/AppError';
import { WorkloadService } from './WorkloadService';
import { ComponentLog } from '../entities/ComponentLog';
import { ComponentLogRepository } from '../repositories/ComponentLogRepository';
import { ComponentLogType } from '../interfaces/ComponentLogType';
import { ComponentStatus } from '../interfaces/ComponentStatus';
import {
    CreateComponentRequestDto,
    UpdateComponentRequestDto,
} from '../dtos/component';
import { ComponentDraft } from '../entities/ComponentDraft';
import { ComponentDraftRepository } from '../repositories/ComponentDraftRepository';

export class ComponentService {
    private componentRepository: Repository<Component>;
    private componentLogRepository: Repository<ComponentLog>;
    private componentDraftRepository: Repository<ComponentDraft>;
    private workloadService: WorkloadService;

    constructor() {
        this.componentRepository = getCustomRepository(ComponentRepository);
        this.componentLogRepository = getCustomRepository(
            ComponentLogRepository
        );
        this.componentDraftRepository = getCustomRepository(
            ComponentDraftRepository
        );
        this.workloadService = new WorkloadService();
    }

    async getComponents(search = '', showDraft = false) {
        const components = await this.componentRepository.find({
            where: [
                {
                    code: ILike(`%${search}%`),
                    status: In([ ComponentStatus.PUBLISHED, showDraft ? ComponentStatus.DRAFT : undefined ])
                },
                {
                    name: ILike(`%${search}%`),
                    status: In([ ComponentStatus.PUBLISHED, showDraft ? ComponentStatus.DRAFT : undefined ])
                },
            ],
            relations: [ 'logs', 'workload', 'draft', 'draft.workload' ],
            order: { code: 'ASC' },
        });

        return components;
    }

    async getComponentByCode(code: string) {
        const component = await this.componentRepository.findOne({
            where: {
                code: Raw((alias) => `LOWER(${alias}) LIKE :code`, {
                    code: `%${code.toLowerCase()}%`,
                }),
            },
            relations: [ 'logs', 'workload', 'draft', 'draft.workload' ],
        });

        if (!component) throw new AppError('Component not found.', 404);

        return component;
    }

    async create(userId: string, requestDto: CreateComponentRequestDto) {
        const componentExists = await this.componentRepository.findOne({
            where: { code: requestDto.code },
        });

        if (componentExists) {
            throw new AppError('Component already exists.', 400);
        }

        try {
            const componentDto = { ...requestDto, userId: userId };

            const [ componentWorkload, draftWorkload ] = await Promise.all(
                new Array(2)
                    .fill(null)
                    .map(() =>
                        this.workloadService.create(componentDto.workload ?? {})
                    )
            );

            delete componentDto.workload;
            componentDto.workloadId = componentWorkload.id;

            const component = this.componentRepository.create({
                status: ComponentStatus.PUBLISHED,
                ...componentDto,
            });
            const createdComponent = await this.componentRepository.save(
                component
            );

            const draft = this.componentDraftRepository.create({
                ...component,
                id: undefined,
                workloadId: draftWorkload.id,
                status: undefined,
                componentId: component.id,
            } as unknown as ComponentDraft);

            let componentLog = component.generateLog(
                userId,
                ComponentLogType.CREATION
            );
            componentLog = this.componentLogRepository.create(componentLog);

            await Promise.all([
                this.componentLogRepository.save(componentLog),
                this.componentDraftRepository.save(draft),
            ]);

            await this.componentRepository.save({
                id: component.id,
                draftId: draft.id,
            });
            component.draftId = draft.id;

            return createdComponent;
        } catch (err) {
            throw new AppError('An error has been occurred.', 400);
        }
    }

    async update(
        id: string,
        componentDto: UpdateComponentRequestDto,
        userId: string
    ) {
        const componentExists = await this.componentRepository.findOne({
            where: { id },
        });

        if (!componentExists) {
            throw new AppError('Component not found.', 404);
        }

        const codeComponent =
            componentDto?.code !== componentExists.code
                ? await this.componentRepository.findOne({
                    where: { code: componentDto.code },
                })
                : null;
        if (codeComponent) {
            throw new AppError('Invalid code', 400);
        }

        try {
            if (componentDto.workload != null) {
                const workloadData = {
                    ...componentDto.workload,
                    id:
                        componentDto.workloadId ??
                        (componentExists.workloadId as string),
                };

                const workload = await this.workloadService.upsert(
                    workloadData
                );
                componentDto.workloadId = workload?.id;
                delete componentDto.workload;
            }

            await this.componentRepository
                .createQueryBuilder()
                .update(Component)
                .set(componentDto)
                .where('id = :id', { id })
                .execute();

            let componentLog = componentExists.generateLog(
                userId,
                ComponentLogType.UPDATE
            );
            componentLog = this.componentLogRepository.create(componentLog);
            await this.componentLogRepository.save(componentLog);

            return await this.componentRepository.findOne({
                where: { id },
            });
        } catch (err) {
            throw new AppError('An error has been occurred.', 400);
        }
    }

    async delete(id: string) {
        const [ componentExists, draft ] = await Promise.all([
            this.componentRepository.findOne({
                where: { id },
            }),
            this.componentDraftRepository.findOne({
                componentId: id,
            }),
        ]);

        if (!componentExists) {
            throw new AppError('Component not found.', 404);
        }

        await this.componentRepository.save({
            ...componentExists,
            draftId: null,
        });

        await Promise.all([
            this.componentLogRepository.delete({
                componentId: id,
            }),
            !draft
                ? null
                : this.componentDraftRepository.delete({
                    id: draft.id,
                }),
        ]);
        await this.componentRepository
            .createQueryBuilder()
            .delete()
            .from(Component)
            .where('id = :id', { id })
            .execute();

        if (componentExists.workloadId != null) {
            await Promise.all([
                this.workloadService.delete(componentExists.workloadId),
                this.workloadService.delete(draft?.workloadId as string),
            ]);
        }
    }
}
