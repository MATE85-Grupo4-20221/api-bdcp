import { getCustomRepository, Like, Repository } from 'typeorm';

import { Component } from '../entities/Component';
import { ComponentRepository } from '../repositories/ComponentRepository';
import { AppError } from '../errors/AppError';
import { ComponentLog } from '../entities/ComponentLog';
import { ComponentLogRepository } from '../repositories/ComponentLogRepository';
import { ComponentLogType } from '../interfaces/ComponentLogType';

export class ComponentService {

    private componentRepository : Repository<Component>;
    private componentLogRepository: Repository<ComponentLog>;

    constructor() {
        this.componentRepository = getCustomRepository(ComponentRepository);
        this.componentLogRepository = getCustomRepository(ComponentLogRepository);
    }
    
    async getComponents() {
        const components = await this.componentRepository.find();

        if (components.length === 0) return [];

        return components;
    }

    async getComponentByID(id: string) {
        const component = await this.componentRepository.findOne({
            where: { id },
        });

        if (!component) return null;
        
        return component;
    }

    async searchComponent(keyword: string) {
        const component = await this.componentRepository.findOne({
            where: {
                code: Like(`%${keyword}%`),
                name: Like(`%${keyword}%`),
            },
        });

        if (!component) return null;
        
        return component;
    }

    async create(
        userId: string,
        requestDto: Omit<Component, 'id' | 'createdAt' | 'updatedAt'>
    ){
        try {
            const componentDto = { ...requestDto, userId: userId };
            const component = this.componentRepository.create(componentDto);
            const createdComponent = await this.componentRepository.save(component);

            let componentLog = component.generateLog(userId, ComponentLogType.CREATION);
            componentLog = this.componentLogRepository.create(componentLog);
            await this.componentLogRepository.save(componentLog);
            
            return createdComponent;
        }
        catch (err) {
            throw new AppError('An error has been occurred.', 400);
        }        
    }

    async update(
        id: string,
        componentDto: Omit<Component, 'createdAt' | 'updatedAt'> &
            { approval?: Pick<ComponentLog, 'minuteDate' | 'minuteNumber'> },
        userId: string
    ) {
        const componentExists = await this.componentRepository.findOne({
            where: { id }
        });

        if(!componentExists){
            throw new AppError('Component not found.', 404);
        }

        try {
            const approval = componentDto?.approval;
            delete componentDto?.approval;

            await this.componentRepository.createQueryBuilder().update(Component)
                .set(componentDto)
                .where('id = :id', { id })
                .execute();

            const isApproved = approval != null && Object.keys(approval).length > 0;
            const previousApprovalLogExists = isApproved
                ? await this.componentLogRepository.findOne({
                    where: {
                        componentId: id,
                        type: ComponentLogType.APPROVAL
                    }
                })
                : null;
            if (isApproved && !previousApprovalLogExists) {
                let componentLog = componentExists.generateLog(
                    userId,
                    ComponentLogType.APPROVAL,
                    undefined,
                    approval.minuteNumber,
                    approval.minuteDate,
                );
                componentLog = this.componentLogRepository.create(componentLog);
                await this.componentLogRepository.save(componentLog);
            } else {
                let componentLog = componentExists.generateLog(
                    userId,
                    ComponentLogType.UPDATE,
                );
                componentLog = this.componentLogRepository.create(componentLog);
                await this.componentLogRepository.save(componentLog);
            }

            return await this.componentRepository.findOne({
                where: { id }
            });
        }
        catch (err) {
            throw new AppError('An error has been occurred.', 400);
        }
    }

    async delete(id: string){
        const componentExists = await this.componentRepository.findOne({
            where: { id }
        });

        if(!componentExists){
            throw new AppError('Component not found.', 404);
        }

        await this.componentLogRepository.delete({
            componentId: id
        });
        await this.componentRepository.createQueryBuilder()
            .delete()
            .from(Component)
            .where('id = :id', { id })
            .execute();
    }

}
