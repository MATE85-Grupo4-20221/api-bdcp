import { Request, Response } from 'express';
import { paginate } from '../helpers/paginate';
import { ComponentDraftService } from '../services/ComponentDraftService';

class ComponentDraftController {
    async getDrafts(request: Request, response: Response) {
        const draftService = new ComponentDraftService();

        const filter = request.query.filter as string;
        const page = parseInt(String(request.query.page)) || 0;
        const limit = parseInt(String(request.query.limit)) || 10;

        const components = await draftService.getDrafts(filter);

        return response.status(200).json(paginate(components, { page, limit }));
    }

    async getDraftByCode(request: Request, response: Response) {
        const draftService = new ComponentDraftService();
        const component = await draftService.getDraftByCode(request.params.code);

        return response.status(200).json(component);
    }

    async create(request: Request, response: Response) {
        const authenticatedUserId = request.headers.authenticatedUserId as string;
        const draftService = new ComponentDraftService();

        const content = await draftService.create(authenticatedUserId, request.body);

        return response.status(201).json(content);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;

        const draftService = new ComponentDraftService();
        const content = await draftService.update(id, request.body);

        return response.status(200).json(content);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const draftService = new ComponentDraftService();
        await draftService.delete(id);

        return response.status(200).json({ message: 'Draft has been deleted!' });
    }

    async approve(request: Request, response: Response) {
        const { id } = request.params;
        const authenticatedUserId = request.headers.authenticatedUserId as string;

        const draftService = new ComponentDraftService();
        const component = await draftService.approve(id, request.body, authenticatedUserId);

        return response.status(200).json(component);
    }

}

export { ComponentDraftController };
