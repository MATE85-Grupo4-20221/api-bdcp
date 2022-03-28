import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Component } from './Component';

@Entity('users')
class User {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column()
        name: string;

    @Column({ unique: true })
        email: string;

    @Column()
        password: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
        createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
        updatedAt?: Date;

    @OneToMany(() => Component, (component) => component.user)
        components: Component[];
}

export { User };
