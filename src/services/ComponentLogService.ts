import { getCustomRepository, Repository } from 'typeorm';
import { ComponentLogRepository } from '../repositories/ComponentLogRepository';
import { ComponentLog } from '../entities/ComponentLog';

export class ComponentLogService {
    private componentLogRepository: Repository<ComponentLog>;

    constructor() {
        this.componentLogRepository = getCustomRepository(
            ComponentLogRepository
        );
    }

    async getComponentLogs(componentId: string, type?: string) {
        const query = this.componentLogRepository
            .createQueryBuilder('component_logs')
            .leftJoinAndSelect('component_logs.user', 'user')
            .where([ { componentId } ])
            .orderBy({
                'component_logs.createdAt': 'DESC',
            });

        if (type) {
            query.andWhere({ type });
        }

        return query.getMany();
    }
}
