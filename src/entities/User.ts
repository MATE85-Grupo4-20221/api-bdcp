import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Component } from './Component';

@Entity('user')
class User {

    @PrimaryColumn()
    readonly id: string;

    @Column()
        name: string;

    @Column()
        email: string;

    @Column()
        password: string;

    @CreateDateColumn({name: 'created_at'})
        createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
        updatedAt: Date;

    @OneToMany(() => Component, (component) => component.user)
        components: Component[];

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }

}

export { User };
