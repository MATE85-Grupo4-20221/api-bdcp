import { getCustomRepository, Like, Repository } from 'typeorm';

import { Component } from '../entities/Component';
import { ComponentRepository } from '../repositories/ComponentRepository';
import { AppError } from '../errors/AppError';
import { WorkloadService } from './WorkloadService';

export class ComponentService {

    private componentRepository : Repository<Component>;
    private workloadService: WorkloadService;

    constructor() {
        this.componentRepository = getCustomRepository(ComponentRepository);
        this.workloadService = new WorkloadService();
    }
    
    async getComponents() {
        const components = await this.componentRepository.find({
            relations: [ 'workload' ],
        });

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

            if(componentDto.workload != null) {
                const workload = await this.workloadService.create(componentDto.workload);
                componentDto.workloadId = workload.id;
                delete componentDto.workload;
            }

            const component = this.componentRepository.create(componentDto);
            
            return await this.componentRepository.save(component);
        }
        catch (err) {
            throw new AppError('An error has been occurred.', 400);
        }        
    }

    async update(
        id: string,
        componentDto: Omit<Component, 'createdAt' | 'updatedAt'>
    ) {
        const componentExists = await this.componentRepository.findOne({
            where: { id }
        });

        if(!componentExists){
            throw new AppError('Component not found.', 404);
        }

        try {
            if(componentDto.workload != null) {
                const workloadData = {
                    ...componentDto.workload,
                    id: componentDto.workload.id ?? componentDto.workloadId ?? componentExists.workloadId,
                };

                const workload = await this.workloadService.upsert(workloadData);
                componentDto.workloadId = workload?.id;
                delete componentDto.workload;
            }

            await this.componentRepository.createQueryBuilder().update(Component)
                .set(componentDto)
                .where('id = :id', { id })
                .execute();

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

        await this.componentRepository.createQueryBuilder()
            .delete()
            .from(Component)
            .where('id = :id', { id })
            .execute();
        
        if (componentExists.workloadId != null)
            await this.workloadService.delete(componentExists.workloadId);
    }

}
