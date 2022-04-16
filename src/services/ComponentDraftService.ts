import { getCustomRepository, ILike, Repository, getConnection } from 'typeorm';
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

export class ComponentDraftService {

    private componentDraftRepository : Repository<ComponentDraft>;
    private componentRepository: Repository<Component>;
    private workloadService: WorkloadService;

    constructor() {
        this.componentDraftRepository = getCustomRepository(ComponentDraftRepository);
        this.componentRepository = getCustomRepository(ComponentRepository);
        this.workloadService = new WorkloadService();
    }

    async getDrafts(filter = '') {
        const drafts = await this.componentDraftRepository.find({
            where: [
                { code: ILike(`${filter}%`) },
                { name: ILike(`${filter}%`) }
            ],
            order: { updatedAt: 'DESC' },
            relations: [ 'workload' ],
        });

        return drafts;
    }

    async getDraftById(id: string) {
        const draft = await this.componentDraftRepository.findOne({
            where: { id },
        });

        if (!draft) return null;

        return draft;
    }

    async create(
        userId: string,
        requestDto: Omit<ComponentDraft, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
    ){
        try {
            const draftDto = { ...requestDto, userId: userId };

            if(draftDto.workload != null) {
                const workload = await this.workloadService.create(draftDto.workload);
                draftDto.workloadId = workload.id;
                delete draftDto.workload;
            }

            const draft = this.componentDraftRepository.create(draftDto);
            return this.componentDraftRepository.save(draft);
        }
        catch (err) {
            throw new AppError('An error has been occurred.', 400);
        }
    }

    async update(
        id: string,
        requestDto: Omit<ComponentDraft, 'createdAt' | 'updatedAt'>,
    ) {
        const draftExists = await this.componentDraftRepository.findOne({
            where: { id }
        });
        if(!draftExists){
            throw new AppError('Draft not found.', 404);
        }
        try {
            if(requestDto.workload != null) {
                const workloadData = {
                    ...requestDto.workload,
                    id: requestDto.workload.id ?? requestDto.workloadId ?? draftExists.workloadId,
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
        approvalDto: Required<Pick<ComponentLog, 'agreementDate' | 'agreementNumber'>>,
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

            const currentPublishedComponent = await this.componentRepository.findOne({
                where: { code: draftExists.code },
            });

            const previousWorkloadId = currentPublishedComponent?.workloadId;
            const component = currentPublishedComponent
                ? currentPublishedComponent.publishDraft(draftExists)
                : this.componentRepository.create({ ...draftExists, status: ComponentStatus.PUBLISHED });

            const draftCreationLog = draftExists.generateDraftLog(component?.id);

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
                queryRunner.manager.save(ComponentLog, draftCreationLog),
                queryRunner.manager.save(ComponentLog, approvalLog),
                queryRunner.manager.delete(ComponentDraft, draftId)
            ]); 

            if(previousWorkloadId && previousWorkloadId !== component.workloadId)
                await queryRunner.manager.delete(ComponentWorkload, previousWorkloadId);

            await queryRunner.commitTransaction();

            return updatedComponent;
        } catch (err) {
            throw new AppError('An error has been occurred.', 400);
        }
    }

}
