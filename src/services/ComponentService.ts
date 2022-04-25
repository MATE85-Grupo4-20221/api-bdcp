import { getCustomRepository, ILike, Raw, Repository, } from 'typeorm';
import puppeteer from 'puppeteer';
import { generateHtml } from '../helpers/templates/component';
import { Component } from '../entities/Component';
import { ComponentRepository } from '../repositories/ComponentRepository';
import { AppError } from '../errors/AppError';
import { WorkloadService } from './WorkloadService';
import { ComponentLog } from '../entities/ComponentLog';
import { ComponentLogRepository } from '../repositories/ComponentLogRepository';
import { ComponentLogType } from '../interfaces/ComponentLogType';
import { ComponentStatus } from '../interfaces/ComponentStatus';
import { CreateComponentRequestDto, UpdateComponentRequestDto } from '../dtos/component';

export class ComponentService {

    private componentRepository: Repository<Component>;
    private componentLogRepository: Repository<ComponentLog>;
    private workloadService: WorkloadService;

    constructor() {
        this.componentRepository = getCustomRepository(ComponentRepository);
        this.componentLogRepository = getCustomRepository(ComponentLogRepository);
        this.workloadService = new WorkloadService();
    }

    async getComponents(filter = '') {
        const components = await this.componentRepository.find({
            where: [
                { code: ILike(`${filter}%`), status: ComponentStatus.PUBLISHED },
                { name: ILike(`${filter}%`), status: ComponentStatus.PUBLISHED }
            ],
            order: { code: 'ASC' },
            relations: [ 'logs', 'workload' ],
        });

        return components;
    }

    async getComponentByCode(code: string) {
        const component = await this.componentRepository.findOne({
            where: { code: Raw((alias) => `LOWER(${alias}) LIKE :code`, { code: `%${code.toLowerCase()}%` }), },
            relations: [ 'logs', 'workload' ]
        });

        if (!component) throw new AppError('Component not found.', 404);

        return component;
    }

    async create(
        userId: string,
        requestDto: CreateComponentRequestDto
    ){
        const componentExists = await this.componentRepository.findOne({
            where: { code: requestDto.code },
        });

        if (componentExists) {
            throw new AppError('Component already exists.', 400);
        }

        try {
            const componentDto = { ...requestDto, userId: userId };

            if (componentDto.workload != null) {
                const workload = await this.workloadService.create(componentDto.workload);
                componentDto.workloadId = workload.id;
                delete componentDto.workload;
            }

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
        componentDto: UpdateComponentRequestDto,
        userId: string
    ) {
        const componentExists = await this.componentRepository.findOne({
            where: { id }
        });

        if (!componentExists) {
            throw new AppError('Component not found.', 404);
        }

        try {
            if (componentDto.workload != null) {
                const workloadData = {
                    ...componentDto.workload,
                    id: componentDto.workloadId ?? componentExists.workloadId as string,
                };

                const workload = await this.workloadService.upsert(workloadData);
                componentDto.workloadId = workload?.id;
                delete componentDto.workload;
            }

            await this.componentRepository.createQueryBuilder().update(Component)
                .set(componentDto)
                .where('id = :id', { id })
                .execute();

            let componentLog = componentExists.generateLog(
                userId,
                ComponentLogType.UPDATE,
            );
            componentLog = this.componentLogRepository.create(componentLog);
            await this.componentLogRepository.save(componentLog);

            return await this.componentRepository.findOne({
                where: { id }
            });
        }
        catch (err) {
            throw new AppError('An error has been occurred.', 400);
        }
    }

    async delete(id: string) {
        const componentExists = await this.componentRepository.findOne({
            where: { id }
        });

        if (!componentExists) {
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

        if (componentExists.workloadId != null)
            await this.workloadService.delete(componentExists.workloadId);
    }

    async export(id: string) {
        const component = await this.componentRepository.findOne({
            where: { id }
        });

        if (!component) {
            throw new AppError('Component not found.', 404);
        }

        const { workload } = component;

        const data = {
            ...component,
            workload: workload ? {
                student: {
                    theory: workload.studentTheory,
                    practice: workload.studentPractice,
                    theoryPractice: workload.studentTheoryPractice,
                    internship: workload.studentInternship,
                    practiceInternship: workload.studentPracticeInternship,
                },
                professor: {
                    theory: workload.teacherTheory,
                    practice: workload.teacherPractice,
                    theoryPractice: workload.teacherTheoryPractice,
                    internship: workload.teacherInternship,
                    practiceInternship: workload.teacherPracticeInternship,
                },
                module: {
                    theory: workload.moduleTheory,
                    practice: workload.modulePractice,
                    theoryPractice: workload.moduleTheoryPractice,
                    internship: workload.moduleInternship,
                    practiceInternship: workload.modulePracticeInternship,
                }
            } : undefined,
        };

        const html = generateHtml(data);

        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
            ],
        });
        const page = await browser.newPage();
        await page.setViewport({
            width: 1560,
            height: 1920
        });
        await page.setContent(html, { waitUntil: 'domcontentloaded' });
        const pdf = await page.pdf({
            printBackground: true,
        });

        await browser.close();

        return pdf;
    }

}
