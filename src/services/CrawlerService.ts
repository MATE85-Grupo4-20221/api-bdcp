import { getCustomRepository, Repository } from 'typeorm';
import axios, { AxiosRequestConfig } from 'axios';
import * as cheerio from 'cheerio';
import type { CheerioAPI } from 'cheerio';

import { Component } from '../entities/Component';
import { ComponentRepository } from '../repositories/ComponentRepository';
import { AppError } from '../errors/AppError';
import { WorkloadService } from './WorkloadService';
import { ComponentLog } from '../entities/ComponentLog';
import { ComponentLogRepository } from '../repositories/ComponentLogRepository';
import { ComponentStatus } from '../interfaces/ComponentStatus';
import { ComponentLogType } from '../interfaces/ComponentLogType';
import { IComponentInfoCrawler } from '../interfaces/IComponentInfoCrawler';

export class CrawlerService {

    private componentRepository : Repository<Component>;
    private componentLogRepository: Repository<ComponentLog>;
    private workloadService: WorkloadService;

    constructor() {
        this.componentRepository = getCustomRepository(ComponentRepository);
        this.componentLogRepository = getCustomRepository(ComponentLogRepository);
        this.workloadService = new WorkloadService();
    }

    async createComponent(userId: string, data: IComponentInfoCrawler) {
        const componentExists = await this.componentRepository.findOne({
            where: { code: data.code },
        });

        if (componentExists) {
            throw new AppError('Component already exists.', 400);
        }

        try {
            const workload = await this.workloadService.create({});

            const component = this.componentRepository.create({
                userId,
                workloadId: workload.id,
                code: data.code,
                name: data.name,
                department: data.department,
                semester: data.semester,
                program: data.description,
                objective: data.objective,
                syllabus: data.syllabus,
                bibliography: data.bibliography,
                status: ComponentStatus.PUBLISHED,
                prerequeriments: 'Não há Pré-Requisitos cadastrados',
                methodology: 'Não há Metodologia cadastrada',
            });
            await this.componentRepository.save(component);

            const componentLog = component.generateLog(userId, ComponentLogType.CREATION);
            await this.componentLogRepository.save(componentLog);
        }
        catch (err) {
            throw new AppError('An error has been occurred.', 400);
        }
    }

    async importComponentsFromSiac(userId: string, cdCurso: string, nuPerCursoInicial: string) {
        'https://alunoweb.ufba.br/SiacWWW/ListaDisciplinasEmentaPublico.do?cdCurso=' + cdCurso + '&nuPerCursoInicial=' + nuPerCursoInicial
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

        function extractCourseInfo($: CheerioAPI): Array < IComponentInfoCrawler > {
            return $('table').eq(1)
                .map((_: any, lesson: any) => {
                    const $lesson = $(lesson);

                    const content = $lesson.find('.even').children();
                    const rows = content.map((_, a) => a.children[0]);
                    const rawData: string[] = rows.map((_, x) => $(x).text().trim()).toArray();

                    const [ code, componentName ] = rawData[0].split('-');

                    return {
                        code: code.trim(),
                        name: componentName.trim(),
                        department: rawData[4],
                        semester: rawData[5],
                        description: rawData[6],
                        objective: rawData[7],
                        syllabus: rawData[8],
                        bibliography: rawData[9],
                        status: ComponentStatus.PUBLISHED,
                        prerequeriments: 'Não há Pré-requisitos cadastrados',
                        methodology: 'Não há Metodologia cadastrado',
                    };
                }).toArray();
        }

        const { data } = await axios(options1);

        const decoder = new TextDecoder('ISO-8859-1');
        const html = decoder.decode(data);
        const $ = cheerio.load(html);
        const urlList = getCourseUrls($);
        urlList.splice(0, 2);
        const lessonsArr: IComponentInfoCrawler[] = [];

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
