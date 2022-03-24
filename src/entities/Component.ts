import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from './User';
import { Workload } from './Workload';

@Entity('component')
class Component {

    @PrimaryColumn()
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

    @OneToOne(() => Workload, (workload) => workload.component)
    @JoinColumn({name: 'workload_id'})
        workload: Workload;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }

}

export { Component };
