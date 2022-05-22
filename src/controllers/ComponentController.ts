import { Request, Response } from 'express';
import { getAuthToken } from '../helpers/getAuthToken';

import { paginate } from '../helpers/paginate';
import { verifyAuthToken } from '../helpers/verifyAuthToken';
import { ComponentLogService } from '../services/ComponentLogService';
import { ComponentService } from '../services/ComponentService';
import { CrawlerService } from '../services/CrawlerService';

const isUserAuthenticated = (authorization?: string) => {
    try {
        const authToken = getAuthToken(authorization);

        if (!authToken) return false;

        verifyAuthToken(authToken);

        return true;
    } catch {
        return false;
    }
};

class ComponentController {
    async importComponentsFromSiac(request: Request, response: Response) {
        const { cdCurso, nuPerCursoInicial } = request.body;
        const authenticatedUserId = request.headers
            .authenticatedUserId as string;
        const crawlerService = new CrawlerService();

        if (!cdCurso || !nuPerCursoInicial) {
            return response.status(400).json({
                message:
                    'O código do curso ou o semestre vigente não foram encontrados!',
            });
        }

        await crawlerService.importComponentsFromSiac(
            authenticatedUserId,
            cdCurso,
            nuPerCursoInicial
        );

        return response.status(201).end();
    }

    async getComponents(request: Request, response: Response) {
        const componentService = new ComponentService();

        const search = request.query.search as string;
        const page = parseInt(String(request.query.page)) || 0;
        const limit = parseInt(String(request.query.limit)) || 10;

        const isAuthenticated = isUserAuthenticated(request.headers.authorization);

        const components = await componentService.getComponents(search, isAuthenticated);

        return response.status(200).json(paginate(components, { page, limit }));
    }

    async getComponentByCode(request: Request, response: Response) {
        const componentService = new ComponentService();

        const component = await componentService.getComponentByCode(
            request.params.code
        );

        return response.status(200).json(component);
    }

    async getComponentLogs(request: Request, response: Response) {
        const componentLogService = new ComponentLogService();

        const componentId = request.params.id;

        const page = parseInt(String(request.query.page)) || 0;
        const limit = parseInt(String(request.query.limit)) || 10;
        const type = request.query.type as string;

        const componentLogs = await componentLogService.getComponentLogs(componentId, type);

        return response.status(200).json(paginate(componentLogs, { page, limit }));
    }

    async create(request: Request, response: Response) {
        const authenticatedUserId = request.headers
            .authenticatedUserId as string;
        const componentService = new ComponentService();

        const content = await componentService.create(
            authenticatedUserId,
            request.body
        );

        return response.status(201).json(content);
    }

    async update(request: Request, response: Response) {
        const authenticatedUserId = request.headers
            .authenticatedUserId as string;
        const { id } = request.params;

        const componentService = new ComponentService();
        const content = await componentService.update(
            id,
            request.body,
            authenticatedUserId
        );

        return response.status(200).json(content);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const componentService = new ComponentService();
        await componentService.delete(id);

        return response
            .status(200)
            .json({ message: 'Component has been deleted!' });
    }

    async export(request: Request, response: Response) {
        const { id } = request.params;
        const componentService = new ComponentService();
        const buffer = await componentService.export(id);
        response.set({ 'Content-Type': 'application/pdf' });
        return response.status(200).send(buffer);
    }
}

export { ComponentController };
