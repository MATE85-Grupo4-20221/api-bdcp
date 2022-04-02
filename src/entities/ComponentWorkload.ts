import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Component } from './Component';

@Entity('component_workloads')
class ComponentWorkload {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column({ name: 'teacher_theory', default: 0 })
        teacherTheory: number;

    @Column({ name: 'teacher_practice', default: 0 })
        teacherPractice: number;

    @Column({ name: 'teacher_theory_practice', default: 0 })
        teacherTheoryPractice: number;

    @Column({ name: 'teacher_internship', default: 0 })
        teacherInternship: number;

    @Column({ name: 'teacher_practice_internship', default: 0 })
        teacherPracticeInternship: number;

    @Column({ name: 'student_theory', default: 0 })
        studentTheory: number;

    @Column({ name: 'student_practice', default: 0 })
        studentPractice: number;

    @Column({ name: 'student_theory_practice', default: 0 })
        studentTheoryPractice: number;

    @Column({ name: 'student_internship', default: 0 })
        studentInternship: number;

    @Column({ name: 'student_practice_internship', default: 0 })
        studentPracticeInternship: number;

    @Column({ name: 'module_theory', default: 0 })
        moduleTheory: number;

    @Column({ name: 'module_practice', default: 0 })
        modulePractice: number;

    @Column({ name: 'module_theory_practice', default: 0 })
        moduleTheoryPractice: number;

    @Column({ name: 'module_internship', default: 0 })
        moduleInternship: number;

    @Column({ name: 'module_practice_internship', default: 0 })
        modulePracticeInternship: number;

    @OneToOne(() => Component, (component) => component.workload)
        component: Component;

    constructor(){
        if(this.studentTheory == null)
            this.studentTheory = 0;
        if(this.studentPractice == null)
            this.studentPractice = 0;
        if(this.studentInternship == null)
            this.studentInternship = 0;
        if(this.studentTheoryPractice == null)
            this.studentTheoryPractice = 0;
        if(this.studentPracticeInternship == null)
            this.studentPracticeInternship = 0;
        if(this.teacherTheory == null)
            this.teacherTheory = 0;
        if(this.teacherPractice == null)
            this.teacherPractice = 0;
        if(this.teacherInternship == null)
            this.teacherInternship = 0;
        if(this.teacherTheoryPractice == null)
            this.teacherTheoryPractice = 0;
        if(this.teacherPracticeInternship == null)
            this.teacherPracticeInternship = 0;
        if(this.moduleTheory == null)
            this.moduleTheory = 0;
        if(this.modulePractice == null)
            this.modulePractice = 0;
        if(this.moduleInternship == null)
            this.moduleInternship = 0;
        if(this.moduleTheoryPractice == null)
            this.moduleTheoryPractice = 0;
        if(this.modulePracticeInternship == null)
            this.modulePracticeInternship = 0;
    }
}

export { ComponentWorkload };
