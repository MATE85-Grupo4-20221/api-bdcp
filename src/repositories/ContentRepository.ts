import { EntityRepository, Repository } from 'typeorm';
import { Content } from '../entities/Content';

@EntityRepository(Content)
class ContentRepository extends Repository<Content> { }

export { ContentRepository };