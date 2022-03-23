import { getCustomRepository, Repository } from 'typeorm';

import { Content } from '../entities/Content';
import { ContentRepository } from '../repositories/ContentRepository';
import { AppError } from '../errors/AppError';

export class ContentService {

    private contentRepository : Repository<Content>;

    constructor() {
        this.contentRepository = getCustomRepository(ContentRepository);
    }

    async getContents() {
        const contents = await this.contentRepository.find();

        if (contents.length === 0) return [];

        return contents;
    }

    async getContentByID(id: number) {
        const content = await this.contentRepository.findOne({
            where: {id},
        });

        if (!content) return null;

        return content;
    }

    async create(
        userId: string,
        requestDto: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>
    ){
        try {
            const contentDto = {...requestDto, userId: userId};
            const content = this.contentRepository.create(contentDto);

            return await this.contentRepository.save(content);
        }
        catch (err) {
            throw new AppError('An error has been occurred.', 400);
        }
    }

    async update(
        id: number,
        contentDto: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>
    ) {
        const contentExists = await this.contentRepository.findOne({
            where: {id}
        });

        if(!contentExists){
            throw new AppError('Content not found.', 404);
        }

        try {
            await this.contentRepository.createQueryBuilder().update(Content)
                .set( contentDto )
                .where('id = :id', {id})
                .execute();

            return await this.contentRepository.findOne({
                where: {id}
            });
        }
        catch (err) {
            throw new AppError('An error has been occurred.', 400);
        }
    }

    async delete(id: number){
        const contentExists = await this.contentRepository.findOne({
            where: {id}
        });

        if(!contentExists){
            throw new AppError('Content not found.', 404);
        }

        await this.contentRepository.createQueryBuilder()
            .delete()
            .from(Content)
            .where('id = :id', {id})
            .execute();
    }

}
