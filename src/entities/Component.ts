import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from './User';
import { ComponentWorkload } from './ComponentWorkload';

@Entity('component')
class Component {

    @PrimaryColumn()
    readonly id: string;

    @Column()
        code: string;

    @Column()
        name: string;

    @Column()
        department: number;

    @Column()
        type: string;

    @Column()
        prerequeriments: string;

    @Column()
        semester: string;

    @Column()
        syllabus: string;

    @Column()
        program: string;

    @Column()
        objective: string;

    @Column()
        metolodogy: string;

    @Column()
        bibliography: string;

    @CreateDateColumn({name: 'created_at'})
        createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
        updatedAt: Date;

    @Column({name: 'user_id'})
        userId: string;

    @ManyToOne(() => User, (user) => user.components)
    @JoinColumn({ name: 'user_id' })
        user: User;

    @OneToOne(() => ComponentWorkload, (componentWorkload) => componentWorkload.component)
        workload: ComponentWorkload;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }

}

export { Component };
