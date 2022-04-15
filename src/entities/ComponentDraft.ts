import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { ComponentWorkload } from './ComponentWorkload';
import { ComponentLog } from './ComponentLog';
import { ComponentLogType } from '../interfaces/ComponentLogType';

@Entity('component_drafts')
class ComponentDraft {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column({ name: 'created_by' })
        userId: string;

    @Column({ name: 'workload_id', nullable: true })
        workloadId?: string;

    @Column({ nullable: true, default: '' })
        code?: string;

    @Column({ nullable: true, default: '' })
        name?: string;

    @Column({ nullable: true, default: '' })
        department?: string;

    @Column({ nullable: true, default: '' })
        program?: string;

    @Column({ nullable: true, default: '' })
        semester?: string;

    @Column({ nullable: true, default: '' })
        prerequeriments?: string;

    @Column({ nullable: true, default: '' })
        methodology?: string;

    @Column({ nullable: true, default: '' })
        objective?: string;

    @Column({ nullable: true, default: '' })
        syllabus?: string;

    @Column({ nullable: true, default: '' })
        bibliography?: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
        createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
        updatedAt?: Date;

    @ManyToOne(() => User, (user) => user.componentDrafts)
    @JoinColumn({ name: 'created_by' })
        user: User;
    
    @OneToOne(() => ComponentWorkload, (componentWorkload) => componentWorkload.componentDraft)
    @JoinColumn({ name: 'workload_id' })
        workload?: ComponentWorkload;

    generateDraftLog(componentId?: string): ComponentLog {
        const log = new ComponentLog();
        log.componentId = componentId ?? this.id;
        log.updatedBy = this.userId;
        log.type = ComponentLogType.DRAFT_CREATION;
        log.description = `Rascunho criado em ${this.createdAt.toISOString()}`;

        return log;
    }
}

export { ComponentDraft };
