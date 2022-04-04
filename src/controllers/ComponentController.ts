import { Request, Response } from 'express';

import { ComponentService } from '../services/ComponentService';
import { CrawlerService } from '../services/CrawlerService';

class ComponentController {
    async importComponentsFromSiac(request: Request, response: Response) {
        const authenticatedUserId = request.headers.authenticatedUserId as string;
        const crawlerService = new CrawlerService();
        const {cdCurso, nuPerCursoInicial} = request.body;
        if(cdCurso == undefined || nuPerCursoInicial == undefined){
            return response.status(400).json('O código do curso ou o semestre vigente não foram encontrados');
        }
        await crawlerService.importComponentsFromSiac(authenticatedUserId, cdCurso, nuPerCursoInicial);
        
        return response.status(201).end();
    }

    async getComponents(request: Request, response: Response) {
        const componentService = new ComponentService();
        const components = await componentService.getComponents(request.query);

        return response.status(200).json(components);
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

}

export { ComponentController };
