import { Request, Response } from 'express';

import { ContentService } from '../services/ContentService';

export class ContentController {
    async getContents(request: Request, response: Response) {
        const contentService = new ContentService();
        const contents = await contentService.getContents();

        return response.status(200).json(contents);
    }

    async getContentById(request: Request, response: Response) {
        const { id } = request.params;
        
        const contentService = new ContentService();
        const content = await contentService.getContentByID(Number(id));
            
        return response.status(200).json(content);
    }

    async create(request: Request, response: Response) {
        const authenticatedUserId = request.headers.authenticatedUserId as string;
        const contentService = new ContentService();

        const content = await contentService.create(authenticatedUserId, request.body);
        
        return response.status(201).json(content);
    }

    async update(request: Request, response: Response) {
        const {id} = request.params;

        const contentService = new ContentService();
        const content = await contentService.update(Number(id), request.body);
            
        return response.status(200).json(content);
    }

    async delete(request: Request, response: Response) {
        const {id} = request.params;

        const contentService = new ContentService();
        await contentService.delete(Number(id));

        return response.status(200).json({message: 'Content has been deleted!'});
    }

}
