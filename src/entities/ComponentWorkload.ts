import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Component } from './Component';

@Entity('component_workloads')
class ComponentWorkload {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column({ name: 'teacher_theory' })
        teacherTheory: number;

    @Column({ name: 'teacher_practice' })
        teacherPractice: number;

    @Column({ name: 'teacher_theory_practice' })
        teacherTheoryPractice: number;

    @Column({ name: 'teacher_internship' })
        teacherInternship: number;

    @Column({ name: 'teacher_practice_internship' })
        teacherPracticeInternship: number;

    @Column({ name: 'student_theory' })
        studentTheory: number;

    @Column({ name: 'student_practice' })
        studentPractice: number;

    @Column({ name: 'student_theory_practice' })
        studentTheoryPractice: number;

    @Column({ name: 'student_internship' })
        studentInternship: number;

    @Column({ name: 'student_practice_internship' })
        studentPracticeInternship: number;

    @Column({ name: 'module_theory' })
        moduleTheory: number;

    @Column({ name: 'module_practice' })
        modulePractice: number;

    @Column({ name: 'module_theory_practice' })
        moduleTheoryPractice: number;

    @Column({ name: 'module_internship' })
        moduleInternship: number;

    @Column({ name: 'module_practice_internship' })
        modulePracticeInternship: number;

    @OneToOne(() => Component, (component) => component.workload)
        component: Component;

}

export { ComponentWorkload };
