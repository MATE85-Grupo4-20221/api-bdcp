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

    @Column({ enum: ComponentStatus, default: ComponentStatus.DRAFT })
        status: ComponentStatus;

    @Column({ unique: true })
        code: string;

    @Column()
        name: string;

    @Column()
        department: string;

    @Column()
        program: string;

    @Column()
        semester: string;

    @Column()
        prerequeriments: string;

    @Column()
        methodology: string;

    @Column()
        objective: string;

    @Column()
        syllabus: string;

    @Column()
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
        
        if(draft.workloadId)
            this.workloadId = draft.workloadId;
        if (draft.name)
            this.name = draft.name;
        if (draft.department)
            this.department = draft.department;
        if (draft.program)
            this.program = draft.program;
        if (draft.semester)
            this.semester = draft.semester;
        if (draft.prerequeriments)
            this.prerequeriments = draft.prerequeriments;
        if (draft.methodology)
            this.methodology = draft.methodology;
        if (draft.objective)
            this.objective = draft.objective;
        if (draft.syllabus)
            this.syllabus = draft.syllabus;
        if (draft.bibliography)
            this.bibliography = draft.bibliography;

        return this;
    }

}

export { Component };
