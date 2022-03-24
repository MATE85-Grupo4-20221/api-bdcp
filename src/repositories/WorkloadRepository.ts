import { EntityRepository, Repository } from 'typeorm';
import { Workload } from '../entities/Workload';

@EntityRepository(Workload)
class WorkloadRepository extends Repository<Workload> { }

export { WorkloadRepository };
