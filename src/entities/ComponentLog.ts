import { Column, Entity, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

import { Component } from './Component';
import { User } from './User';

@Entity('component_logs')
class ComponentLog {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column({name: 'component_id'})
        componentId: string;

    @Column({name: 'updated_by'})
        updatedBy: string;

    @Column({name: 'minute_number'})
        minuteNumber?: string;

    @Column({name: 'minute_date'})
        minuteDate?: Date;

    @Column()
        description?: string;

    @Column()
        type?: string;

    @CreateDateColumn({name: 'created_at'})
        createdAt: Date;

    @ManyToOne(() => Component, (component) => component.logs)
    @JoinColumn({ name: 'component_id' })
        component: Component;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'updated_by' })
        user: User;

}

export { ComponentLog };
