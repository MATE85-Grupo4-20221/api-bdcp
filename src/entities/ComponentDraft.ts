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
import { Component } from './Component';

@Entity('component_drafts')
class ComponentDraft {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column({ name: 'component_id' })
        componentId: string;

    @Column({ name: 'created_by' })
        userId: string;

    @Column({ name: 'workload_id', nullable: true })
        workloadId?: string;

    @Column({ unique: true })
        code: string;

    @Column({ default: '' })
        name?: string;

    @Column({ default: '' })
        department?: string;

    @Column({ default: '' })
        modality: string;

    @Column({ default: '' })
        program?: string;

    @Column({ default: '' })
        semester?: string;

    @Column({ default: '' })
        prerequeriments?: string;

    @Column({ default: '' })
        methodology?: string;

    @Column({ default: '' })
        objective?: string;

    @Column({ default: '' })
        syllabus?: string;

    @Column({ default: '' })
        learningAssessment: string;

    @Column({ default: '' })
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

    @OneToOne(() => Component, (component) => component.draft)
    @JoinColumn({ name: 'component_id' })
        component: Component;

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
