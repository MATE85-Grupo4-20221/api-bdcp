import { Request, Response } from 'express';
import { ComponentService } from '../services/ComponentService';
import axios, { AxiosRequestConfig} from 'axios';
import cheerio, { CheerioAPI } from 'cheerio';

class ComponentController {
    async getComponents(request: Request, response: Response) {
        const componentService = new ComponentService();
        const components = await componentService.getComponents();

        return response.status(200).json(components);
    }

    async getComponentById(request: Request, response: Response) {
        const { id } = request.params;

        const componentService = new ComponentService();
        const component = await componentService.getComponentByID(id);

        return response.status(200).json(component);
    }

    async searchComponent(request: Request, response: Response) {
        const { keyword } = request.params;

        const componentService = new ComponentService();
        const component = await componentService.searchComponent(keyword);

        return response.status(200).json(component);
    }

    async create(request: Request, response: Response) {
        const authenticatedUserId = request.headers.authenticatedUserId as string;
        const componentService = new ComponentService();

        const content = await componentService.create(authenticatedUserId, request.body);

        return response.status(201).json(content);
    }

    async update(request: Request, response: Response) {
        const authenticatedUserId = request.headers.authenticatedUserId as string;
        const { id } = request.params;

        const componentService = new ComponentService();
        const content = await componentService.update(id, request.body, authenticatedUserId);

        return response.status(200).json(content);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const componentService = new ComponentService();
        await componentService.delete(id);

        return response.status(200).json({ message: 'Component has been deleted!' });
    }

    async fillDatabaseWithCrawler(request: Request, response: Response) {
        const authenticatedUserId = request.headers.authenticatedUserId as string;
        const componentService = new ComponentService();
        const options1: AxiosRequestConfig = {
            method: 'get',
            url: 'https://alunoweb.ufba.br/SiacWWW/ListaDisciplinasEmentaPublico.do?cdCurso=112140&nuPerCursoInicial=20132',
            responseType: 'arraybuffer',
            responseEncoding: 'binary',
            headers: {
                'Content-type': 'application/json'
            },
        }
        const options2: AxiosRequestConfig = {
            method: 'get',
            url: '',
            responseType: 'arraybuffer',
            responseEncoding: 'binary',
            headers: {
                'Content-type': 'application/json'
            },
        }
        const extractClassOB = ($: CheerioAPI) =>
            $('table').eq(2).find('tr')
                .map((_: any, lesson: any) => {
                    const $lesson = $(lesson); 
                    
                    return { 
                        code: $lesson.find('td:nth-child(2)').text(), 
                        name: $lesson.find('td:nth-child(3)').text().trim(),
                        kind: $lesson.find('td:nth-child(4)').text().trim(),
                        url: 'https://alunoweb.ufba.br' + $lesson.find('td:nth-child(3) a').attr('href') 
                    }; 
                }).toArray(); 
                
        const extractFullClass = ($: CheerioAPI, content: { code: any; name: any; kind: any; }) =>
            $('table').eq(1)
                .map((_: any, lesson: any) => {
                    const $lesson = $(lesson); 
                    
                    return { 
                        code: content.code, 
                        name: content.name,
                        kind:content.kind,
                        syllabus: $lesson.find('tr:nth-child(7) td:nth-child(1)').text(),
                    }; 
                }).toArray();
        
            axios(options1)
            .then(({ data }) => {
                const decoder = new TextDecoder('ISO-8859-1');
                let html = decoder.decode(data)
                const $ = cheerio.load(html);
                const lessonsOB = extractClassOB($);
                lessonsOB.splice(0,2)
                let promises = [];
                let lessonsArr: any[] = []
                let promises2: any[] = [];

                for(const lesson of lessonsOB){
                    try{
                        options2.url = lesson.url
                        promises.push(
                            axios(options2).then(({ data }) => {
                                const decoder = new TextDecoder('ISO-8859-1');
                                let html = decoder.decode(data)
                                const $ = cheerio.load(html); // Initialize cheerio
                                const fullLessonsOB = extractFullClass($,lesson);
                                lessonsArr.push(fullLessonsOB);
                            })
                        )
                    }
                    catch(err){
                        console.log(err)
                    }
                }
                Promise.all(promises).then(() => {
                    for(const component of lessonsArr.flat()){
                        promises2.push(componentService.create(authenticatedUserId, component));
                    }
                    Promise.all(promises2).then(() => {return response.status(201).json("All components created");});
                });
        
            })

        // const content = await componentService.create(authenticatedUserId, request.body);
        
        // return response.status(201).json(content);
    }

}

export { ComponentController };
