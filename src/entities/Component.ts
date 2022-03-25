import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

import { User } from './User';
import { ComponentWorkload } from './ComponentWorkload';
import { ComponentLog } from './ComponentLog';

@Entity('components')
class Component {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column({name: 'user_id'})
        userId: string;

    @Column({name: 'workload_id'})
        workloadId: string;

    @Column()
        status: string;

    @Column()
        code: string;

    @Column()
        name: string;

    @Column()
        department: number;

    @Column()
        type: string;

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

    @CreateDateColumn({name: 'created_at'})
        createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
        updatedAt: Date;

    @ManyToOne(() => User, (user) => user.components)
    @JoinColumn({ name: 'user_id' })
        user: User;

    @OneToOne(() => ComponentWorkload, (componentWorkload) => componentWorkload.component)
    @JoinColumn({name: 'workload_id'})
        workload: ComponentWorkload;

    @OneToMany(() => ComponentLog, (componentLog) => componentLog.component)
        logs: ComponentLog[];

}

export { Component };
