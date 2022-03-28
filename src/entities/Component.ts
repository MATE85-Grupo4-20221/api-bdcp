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
import { ComponentType } from '../interfaces/ComponentType';

@Entity('components')
class Component {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column({ name: 'created_by' })
        userId: string;

    @Column({ enum: ComponentStatus })
        status: ComponentStatus;

    @Column({ enum: ComponentType })
        type: ComponentType;

    @Column()
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

    @ManyToOne(() => User, (user) => user.components)
    @JoinColumn({ name: 'created_by' })
        user: User;

    @OneToOne(() => ComponentWorkload, (componentWorkload) => componentWorkload.component)
        workload: ComponentWorkload;

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

}

export { Component };
