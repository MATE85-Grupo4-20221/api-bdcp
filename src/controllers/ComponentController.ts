import { Request, Response } from 'express';

import { paginate } from '../helpers/paginate';
import { ComponentService } from '../services/ComponentService';
import { CrawlerService } from '../services/CrawlerService';

class ComponentController {
    async importComponentsFromSiac(request: Request, response: Response) {
        const { cdCurso, nuPerCursoInicial } = request.body;
        const authenticatedUserId = request.headers.authenticatedUserId as string;
        const crawlerService = new CrawlerService();

        if(!cdCurso || !nuPerCursoInicial){
            return response.status(400).json({ message: 'O código do curso ou o semestre vigente não foram encontrados!' });
        }

        await crawlerService.importComponentsFromSiac(authenticatedUserId, cdCurso, nuPerCursoInicial);

        return response.status(201).end();
    }

    async getComponents(request: Request, response: Response) {
        const componentService = new ComponentService();

        const filter = request.query.filter as string;
        const page = parseInt(String(request.query.page)) || 0;
        const limit = parseInt(String(request.query.limit)) || 10;

        const components = await componentService.getComponents(filter);

        return response.status(200).json(paginate(components, { page, limit }));
    }

    async getComponentById(request: Request, response: Response) {
        const componentService = new ComponentService();
        const component = await componentService.getComponentById(request.params.id);

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

    async approve(request: Request, response: Response) {
        const { id } = request.params;
        const authenticatedUserId = request.headers.authenticatedUserId as string;

        const componentService = new ComponentService();
        await componentService.approve(id, request.body, authenticatedUserId);

        return response.status(204).json();
    }

}

export { ComponentController };
