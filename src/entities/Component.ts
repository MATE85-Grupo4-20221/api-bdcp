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

@Entity('components')
class Component {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column({ name: 'created_by' })
        userId: string;

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
        updatedAt: Date;

    @OneToOne(() => ComponentWorkload, (componentWorkload) => componentWorkload.component)
        workload: ComponentWorkload;

    @OneToMany(() => ComponentLog, (componentLog) => componentLog.component)
        logs: ComponentLog[];

    @ManyToOne(() => User, (user) => user.components, {
        cascade: [ 'insert', 'update', 'remove' ]
    })
    @JoinColumn({ name: 'created_by' })
        user: User;

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

}

export { Component };
