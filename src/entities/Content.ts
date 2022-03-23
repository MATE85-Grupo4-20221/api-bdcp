import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { User } from './User';

@Entity('content')
export class Content {

    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({
        length: 45,
        nullable: true
    })
        code: string;
    
    @Column({
        length: 45,
        nullable: true
    })
        name: string;
    
    @Column({ nullable: true })
        department: number;
    
    @Column({
        type: 'int',
        name: 'teaching_hours',
        nullable: true
    })
        teachingHours: number;
    
    @Column({
        type: 'int',
        name: 'student_hours',
        nullable: true,
    })
        studentHours: number;
    
    @Column({
        length: 45,
        nullable: true
    })
        module: string;
    
    @Column({
        name: 'semester',
        nullable: true
    })
        actingSemester: string;

    @Column({
        length: 2000,
        nullable: true
    })
        syllabus: string;

    @Column({
        length: 2000,
        nullable: true
    })
        program: string;

    @Column({
        length: 2000,
        nullable: true
    })
        objective: string;

    @Column({
        length: 2000,
        nullable: true
    })
        metolodogy: string;

    @Column({
        length: 2000,
        nullable: true
    })
        bibliography: string;  

    @CreateDateColumn({name: 'created_at'})
        createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
        updatedAt: Date;

    @Column({name: 'user_id'})
        userId: string;

    @ManyToOne(
        () => User, (user) => user.contents, 
        {nullable: false}
    )
    @JoinColumn({ name: 'user_id' })
        user: User;
}
