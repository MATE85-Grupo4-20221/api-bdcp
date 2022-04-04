import { getCustomRepository, Repository, ILike } from 'typeorm';
import axios, { AxiosRequestConfig } from 'axios';
import * as cheerio from 'cheerio';
import type { CheerioAPI } from 'cheerio';

import { Component } from '../entities/Component';
import { ComponentRepository } from '../repositories/ComponentRepository';
import { AppError } from '../errors/AppError';
import { WorkloadService } from './WorkloadService';
import { ComponentLog } from '../entities/ComponentLog';
import { ComponentLogRepository } from '../repositories/ComponentLogRepository';
import { ComponentLogType } from '../interfaces/ComponentLogType';
import { ComponentStatus } from '../interfaces/ComponentStatus';

interface ComponentInfo {
    code: string;
    componentName: string,
    workload: {
        theoretical: number;
        practice: number,
        internship: number,
    }
    department: string,
    currentSemester: string, // 2007.2
    description: string,
    goal: string,
    program: string,
    bibliography: string,
}

export class ComponentService {

    private componentRepository: Repository<Component>;
    private componentLogRepository: Repository<ComponentLog>;
    private workloadService: WorkloadService;

    constructor() {
        this.componentRepository = getCustomRepository(ComponentRepository);
        this.workloadService = new WorkloadService();
        this.componentLogRepository = getCustomRepository(ComponentLogRepository);
    }

    async searchComponents(keyword: string) {
        return this.componentRepository.find({
            where: [
                { code: ILike(`%${keyword}%`) },
                { name: ILike(`%${keyword}%`) }
            ],
            relations: [ 'component_logs', 'component_workloads' ],
            //ele n reconhece as relations e dá erro, mas a função funciona com essa parte comentada
        });
    }

    async getComponents() {
        return this.componentRepository.find();
    }

    async getComponentById(id: string) {
        const component = await this.componentRepository.findOne({
            where: { id },
        });

        if (!component) {
            throw new AppError('Component not found.', 404);
        }

        return component;
    }

    async create(
        userId: string,
        requestDto: Omit<Component, 'id' | 'createdAt' | 'updatedAt'>
    ) {
        const componentExists = await this.componentRepository.findOne({
            where: { code: requestDto.code },
        });

        if (componentExists) {
            throw new AppError('Component already exists.', 400);
        }

        try {
            const componentDto = { ...requestDto, userId };

            if(componentDto.workload != null) {
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
        componentDto: Omit<Component, 'createdAt' | 'updatedAt'> &
        { approval?: Pick<ComponentLog, 'agreementDate' | 'agreementNumber'> },
        userId: string
    ) {
        const componentExists = await this.componentRepository.findOne({
            where: { id }
        });

        if (!componentExists) {
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
                    approval.agreementNumber,
                    approval.agreementDate,
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

    async createComponent(userId: string, data: ComponentInfo) {
        const componentExists = await this.componentRepository.findOne({
            where: { code: data.code },
        });

        if (componentExists) {
            throw new AppError('Component already exists.', 400);
        }

        const component = this.componentRepository.create({
            userId,
            code: data.code,
            name: data.componentName,
            department: data.department,
            semester: data.currentSemester,
            program: data.description,
            objective: data.goal,
            syllabus: data.program,
            bibliography: data.bibliography,
            status: ComponentStatus.PUBLISHED,
            prerequeriments: 'Nenhum Cadastrado',
            methodology: 'Nenhum Cadastrado',
        });
        await this.componentRepository.save(component);
        const componentLog = component.generateLog(userId, ComponentLogType.CREATION);
        await this.componentLogRepository.save(componentLog);

    }

    async importCourses(userId: string) {
        const options1: AxiosRequestConfig = {
            method: 'get',
            url: 'https://alunoweb.ufba.br/SiacWWW/ListaDisciplinasEmentaPublico.do?cdCurso=112140&nuPerCursoInicial=20132',
            responseType: 'arraybuffer',
            responseEncoding: 'binary',
            headers: {
                'Content-type': 'application/json'
            },
        };
        const options2: AxiosRequestConfig = {
            method: 'get',
            url: '',
            responseType: 'arraybuffer',
            responseEncoding: 'binary',
            headers: {
                'Content-type': 'application/json'
            },
        };

        function getCourseUrls($: CheerioAPI) {
            return $('table').eq(2).find('tr')
                .map((_: any, lesson: any) => {
                    const $lesson = $(lesson);
                    return 'https://alunoweb.ufba.br' + $lesson.find('td:nth-child(3) a').attr('href');
                }).toArray();
        }

        function extractCourseInfo($: CheerioAPI): Array < ComponentInfo > {
            return $('table').eq(1)
                .map((_: any, lesson: any) => {
                    const $lesson = $(lesson);

                    const content = $lesson.find('.even').children();
                    const rows = content.map((_, a) => a.children[0]);
                    const rawData: string[] = rows.map((_, x) => $(x).text().trim()).toArray();

                    const [ code, componentName ] = rawData[0].split('-');

                    return {
                        code: code.trim(),
                        componentName: componentName.trim(),
                        workload: {
                            theoretical: Number(rawData[1]),
                            practice: Number(rawData[2]),
                            internship: Number(rawData[3]),
                        },
                        department: rawData[4],
                        currentSemester: rawData[5],
                        description: rawData[6],
                        goal: rawData[7],
                        program: rawData[8],
                        bibliography: rawData[9],
                    };
                }).toArray();
        }

        const { data } = await axios(options1);

        const decoder = new TextDecoder('ISO-8859-1');
        const html = decoder.decode(data);
        const $ = cheerio.load(html);
        const urlList = getCourseUrls($);
        urlList.splice(0, 2);
        const lessonsArr: ComponentInfo[] = [];

        const responses = await Promise.all(urlList.map(url => axios({ ...options2, url, })));

        for (const response of responses) {
            const decoder = new TextDecoder('ISO-8859-1');
            const html = decoder.decode(response.data);
            const $ = cheerio.load(html); // Initialize cheerio
            const courseInfo = extractCourseInfo($);
            console.log(courseInfo);
            lessonsArr.push(...courseInfo);
            this.createComponent(userId, courseInfo[0]).catch((err) => {
                console.log(err);
            });
        }
    }

}
