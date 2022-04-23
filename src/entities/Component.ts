import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { ComponentWorkload } from './ComponentWorkload';
import { ComponentLog } from './ComponentLog';
import { ComponentLogType } from '../interfaces/ComponentLogType';
import { ComponentStatus } from '../interfaces/ComponentStatus';
import { ComponentDraft } from './ComponentDraft';

@Entity('components')
class Component {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column({ name: 'created_by' })
        userId: string;

    @Column({ name: 'workload_id', nullable: true })
        workloadId?: string;

    @Column({ name: 'component_draft_id', nullable: true })
        draftId?: string | null;

    @Column({ enum: ComponentStatus, default: ComponentStatus.DRAFT })
        status: ComponentStatus;

    @Column({ unique: true })
        code: string;

    @Column({ default: '' })
        name: string;

    @Column({ default: '' })
        department: string;

    @Column({ default: '' })
        modality: string;

    @Column({ default: '' })
        program: string;

    @Column({ default: '' })
        semester: string;

    @Column({ default: '' })
        prerequeriments: string;

    @Column({ default: '' })
        methodology: string;

    @Column({ default: '' })
        objective: string;

    @Column({ default: '' })
        syllabus: string;

    @Column({ default: '' })
        learningAssessment: string;

    @Column({ default: '' })
        bibliography: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
        createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
        updatedAt?: Date;

    @ManyToOne(() => User, (user) => user.components)
    @JoinColumn({ name: 'created_by' })
        user: User;

    @OneToOne(() => ComponentWorkload, (componentWorkload) => componentWorkload.component)
    @JoinColumn({ name: 'workload_id' })
        workload?: ComponentWorkload;

    @OneToMany(() => ComponentLog, (componentLog) => componentLog.component)
        logs: ComponentLog[];
    
    @OneToOne(() => ComponentDraft, (componentDraft) => componentDraft.component)
    @JoinColumn({ name: 'component_draft_id' })
        draft?: ComponentDraft;

    generateLog(
        userId: string,
        type: ComponentLogType,
        description?: string,
        agreementNumber?: string,
        agreementDate?: Date
    ): ComponentLog {
        const log = new ComponentLog();
        log.componentId = this.id;
        log.updatedBy = userId;
        log.type = type;
        log.agreementNumber = agreementNumber;
        log.agreementDate = agreementDate;
        log.description = description;

        return log;
    }

    publishDraft(draft: ComponentDraft) {
        this.status = ComponentStatus.PUBLISHED;
        
        if (draft.name != null)
            this.name = draft.name;
        if (draft.department != null)
            this.department = draft.department;
        if (draft.program != null)
            this.program = draft.program;
        if (draft.semester != null)
            this.semester = draft.semester;
        if (draft.prerequeriments != null)
            this.prerequeriments = draft.prerequeriments;
        if (draft.methodology != null)
            this.methodology = draft.methodology;
        if (draft.objective != null)
            this.objective = draft.objective;
        if (draft.syllabus != null)
            this.syllabus = draft.syllabus;
        if (draft.bibliography != null)
            this.bibliography = draft.bibliography;
        if (draft.learningAssessment != null)
            this.learningAssessment = draft.learningAssessment;
        if (draft.modality != null)
            this.modality = draft.modality;

        return this;
    }

}

export { Component };
