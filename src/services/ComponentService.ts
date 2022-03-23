import { getCustomRepository, Like, Repository } from 'typeorm';

import { Component } from '../entities/Component';
import { ComponentRepository } from '../repositories/ComponentRepository';
import { AppError } from '../errors/AppError';

export class ComponentService {

    private componentRepository : Repository<Component>;

    constructor() {
        this.componentRepository = getCustomRepository(ComponentRepository);
    }
    
    async getComponents() {
        const components = await this.componentRepository.find();

        if (components.length === 0) return [];

        return components;
    }

    async getComponentByID(id: string) {
        const component = await this.componentRepository.findOne({
            where: {id},
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
            const componentDto = {...requestDto, userId: userId};
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
            where: {id}
        });

        if(!componentExists){
            throw new AppError('Component not found.', 404);
        }

        try {
            await this.componentRepository.createQueryBuilder().update(Component)
                .set(componentDto)
                .where('id = :id', {id})
                .execute();

            return await this.componentRepository.findOne({
                where: {id}
            });
        }
        catch (err) {
            throw new AppError('An error has been occurred.', 400);
        }
    }

    async delete(id: string){
        const componentExists = await this.componentRepository.findOne({
            where: {id}
        });

        if(!componentExists){
            throw new AppError('Component not found.', 404);
        }

        await this.componentRepository.createQueryBuilder()
            .delete()
            .from(Component)
            .where('id = :id', {id})
            .execute();
    }

}
