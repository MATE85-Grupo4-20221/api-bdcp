import { Column, Entity, PrimaryColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Component } from './Component';
import { User } from './User';

@Entity('log')
class Log {

    @PrimaryColumn()
    readonly id: string;

    @Column({name: 'component_id'})
        componentId: string;

    @Column({name: 'updated_by'})
        updatedBy: string;

    @Column({name: 'minute_number'})
        minuteNumber: string;

    @Column({name: 'minute_date'})
        minuteDate: Date;

    @Column()
        description: string;

    @Column()
        type: string;

    @CreateDateColumn({name: 'created_at'})
        createdAt: Date;

    @ManyToOne(() => Component, (component) => component.logs)
        component: Component;

    @ManyToOne(() => User)
        user: User;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }

}

export { Log };
