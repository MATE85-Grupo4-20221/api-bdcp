import { getCustomRepository, Repository, getConnection, Raw } from 'typeorm';
import { ComponentDraftRepository } from '../repositories/ComponentDraftRepository';
import { AppError } from '../errors/AppError';
import { WorkloadService } from './WorkloadService';
import { ComponentDraft } from '../entities/ComponentDraft';
import { ComponentRepository } from '../repositories/ComponentRepository';
import { Component } from '../entities/Component';
import { ComponentLog } from '../entities/ComponentLog';
import { ComponentStatus } from '../interfaces/ComponentStatus';
import { ComponentWorkload } from '../entities/ComponentWorkload';
import { ComponentLogType } from '../interfaces/ComponentLogType';
import { ApproveDraftRequestDto } from '../dtos/component/draft/ApproveDraftRequest';
import { CreateDraftRequestDto } from '../dtos/component/draft/CreateDraftRequest';
import { UpdateComponentRequestDto } from '../dtos/component';
import { ComponentLogRepository } from '../repositories/ComponentLogRepository';

export class ComponentDraftService {

    private componentDraftRepository : Repository<ComponentDraft>;
    private componentRepository: Repository<Component>;
    private componentLogRepository: Repository<ComponentLog>;
    private workloadService: WorkloadService;

    constructor() {
        this.componentDraftRepository = getCustomRepository(ComponentDraftRepository);
        this.componentRepository = getCustomRepository(ComponentRepository);
        this.componentLogRepository = getCustomRepository(ComponentLogRepository);
        this.workloadService = new WorkloadService();
    }

    async getDrafts(filter = '') {
        const drafts = await this.componentDraftRepository.find({
            where: [
                { code: Raw((alias) => `LOWER(${alias}) LIKE :code`, { code: `%${ filter.toLowerCase() }%` }) },
                { name: Raw((alias) => `LOWER(${alias}) LIKE :code`, { code: `%${ filter.toLowerCase() }%` }) }
            ],
            order: { updatedAt: 'DESC' },
            relations: [ 'workload' ],
        });

        return drafts;
    }

    async getDraftByCode(code: string) {
        const draft = await this.componentDraftRepository.findOne({
            where: {
                code: Raw((alias) => `LOWER(${alias}) LIKE :code`, { code: `%${ code.toLowerCase() }%` })
            },
            relations: [ 'workload' ],
        });

        if (!draft) return null;

        return draft;
    }

    async create(
        userId: string,
        requestDto: CreateDraftRequestDto
    ){
        const draftExists = await this.componentDraftRepository.findOne({
            where: { code: requestDto.code },
        });

        if (draftExists) {
            throw new AppError('Draft already exists.', 400);
        }

        try {
            const draftDto = { ...requestDto, userId: userId };

            const [ draftWorkload, componentWorkload ] = await Promise.all([
                this.workloadService.create(draftDto.workload ?? {}),
                this.workloadService.create(draftDto.workload ?? {})
            ]);
            draftDto.workloadId = draftWorkload.id;

            delete draftDto.workload;

            const component = this.componentRepository.create({
                ...draftDto,
                status: ComponentStatus.DRAFT,
                workloadId: componentWorkload.id
            });
            await this.componentRepository.save(component);
            let componentLog = component.generateLog(userId, ComponentLogType.CREATION);
            componentLog = this.componentLogRepository.create(componentLog);

            const draft = this.componentDraftRepository.create({ ...draftDto, componentId: component.id });
            await Promise.all([
                this.componentDraftRepository.save(draft),
                this.componentLogRepository.save(componentLog),
            ]);

            await this.componentRepository.save({ ...component, draftId: draft.id });

            return draft;
        }
        catch (err) {
            throw new AppError('An error has been occurred.', 400);
        }
    }

    async update(
        id: string,
        requestDto: UpdateComponentRequestDto,
    ) {
        const draftExists = await this.componentDraftRepository.findOne({
            where: { id }
        });
        if(!draftExists){
            throw new AppError('Draft not found.', 404);
        }

        const codeDraft = requestDto?.code !== draftExists.code
            ? await this.componentDraftRepository.findOne({ where: { code: requestDto.code } })
            : null;
        if(codeDraft) {
            throw new AppError('Invalid code', 400);
        }

        try {
            if(requestDto.workload != null) {
                const workloadData = {
                    ...requestDto.workload,
                    id: requestDto.workloadId ?? draftExists.workloadId as string,
                };
                const workload = await this.workloadService.upsert(workloadData);
                requestDto.workloadId = workload?.id;
                delete requestDto.workload;
            }

            return this.componentDraftRepository.save({
                ...draftExists,
                ...requestDto
            });
        }
        catch (err) {
            throw new AppError('An error has been occurred.', 400);
        }
    }

    async delete(id: string){
        const componentExists = await this.componentDraftRepository.findOne({
            where: { id }
        });

        if(!componentExists){
            throw new AppError('Draft not found.', 404);
        }

        await this.componentDraftRepository.delete(id);
            
        if (componentExists.workloadId != null)
            await this.workloadService.delete(componentExists.workloadId);
    }

    async approve(
        draftId: string,
        approvalDto: ApproveDraftRequestDto,
        userId: string
    ) {
        try {
            const connection = getConnection();
            const queryRunner = connection.createQueryRunner();
            const draftExists = await this.componentDraftRepository.findOne({
                where: { id: draftId }
            });

            if(!draftExists){
                throw new AppError('Draft not found.', 404);
            }

            const [ currentPublishedComponent, draftWorkload ] = await Promise.all([
                this.componentRepository.findOne({
                    where: { id: draftExists.componentId },
                }),
                this.workloadService.getWorkloadById(draftExists.workloadId as string)
            ]) as [ Component, ComponentWorkload ];

            const component = currentPublishedComponent.publishDraft(draftExists);

            const approvalLog = component.generateLog(
                userId,
                ComponentLogType.APPROVAL,
                undefined,
                approvalDto.agreementNumber,
                approvalDto.agreementDate,
            );

            await queryRunner.startTransaction();

            const [ updatedComponent ] = await Promise.all([
                queryRunner.manager.save(Component, component),
                queryRunner.manager.save(ComponentLog, approvalLog),
                queryRunner.manager.save(ComponentWorkload, { ...draftWorkload, id: currentPublishedComponent.workloadId }),
            ]); 

            await queryRunner.commitTransaction();

            return updatedComponent;
        } catch (err) {
            throw new AppError('An error has been occurred.', 400);
        }
    }

}
