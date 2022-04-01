import { getCustomRepository, Repository } from 'typeorm';
import { WorkloadRepository } from '../repositories/WorkloadRepository';
import { AppError } from '../errors/AppError';
import { Workload } from '../entities/Workload';

export class WorkloadService {

    private workloadRepository : Repository<Workload>;

    constructor() {
        this.workloadRepository = getCustomRepository(WorkloadRepository);
    }

    async getWorkloadById(id: string) {
        const workload = await this.workloadRepository.findOne({
            where: { id },
        });

        if (!workload) return null;
        
        return workload;
    }

    async create(
        dto: Omit<Workload, 'id'>
    ) {
        try {
            const workload = this.workloadRepository.create(dto);
            
            return await this.workloadRepository.save(workload);
        }
        catch (err) {
            throw new AppError('An error has been occurred.', 400);
        }        
    }

    async update(
        id: number,
        dto: Partial<Workload>
    ) {
        const workloadExists = await this.workloadRepository.findOne({
            where: { id }
        });

        if(!workloadExists){
            throw new AppError('Workload not found.', 404);
        }

        try {
            await this.workloadRepository.createQueryBuilder().update(Workload)
                .set(dto)
                .where('id = :id', { id })
                .execute();

            return await this.workloadRepository.findOne({
                where: { id }
            });
        }
        catch (err) {
            throw new AppError('An error has been occurred.', 400);
        }
    }

    async upsert(
        dto: Workload
    ) {
        const workloadExists = dto?.id == null
            ? null
            :  await this.workloadRepository.findOne({
                where: { id: dto.id }
            });
        if(!workloadExists) {
            return this.create(dto);
        }

        await this.workloadRepository.createQueryBuilder().update(Workload)
            .set(dto)
            .where('id = :id', { id:  dto.id })
            .execute();

        return this.workloadRepository.findOne({
            where: { id: dto.id }
        });
    }

    async delete(id: number){
        const workloadExists = await this.workloadRepository.findOne({
            where: { id }
        });

        if(!workloadExists){
            throw new AppError('Workload not found.', 404);
        }

        await this.workloadRepository.createQueryBuilder()
            .delete()
            .from(Workload)
            .where('id = :id', { id })
            .execute();
    }

}
