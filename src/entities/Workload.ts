import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Component } from './Component';

@Entity('workload')
export class Workload {

    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ name: 'student_theory' })
        studentTheory: number;
    
    @Column({ name: 'student_practice' })
        studentPractice: number;
    
    @Column({ name: 'student_intership' })
        studentInternship: number;
    
    @Column({ name: 'student_theory_practice' })
        studentTheoryPractice: number;
    
    @Column({ name: 'student_practice_internship' })
        studentPracticeInternship: number;

    @Column({ name: 'teacher_theory' })
        teacherTheory: number;
    
    @Column({ name: 'teacher_practice' })
        teacherPractice: number;
    
    @Column({ name: 'teacher_intership' })
        teacherInternship: number;
    
    @Column({ name: 'teacher_theory_practice' })
        teacherTheoryPractice: number;
    
    @Column({ name: 'teacher_practice_internship' })
        teacherPracticeInternship: number;

    @Column({ name: 'module_theory' })
        moduleTheory: number;
    
    @Column({ name: 'module_practice' })
        modulePractice: number;
    
    @Column({ name: 'module_intership' })
        moduleInternship: number;
    
    @Column({ name: 'module_theory_practice' })
        moduleTheoryPractice: number;
    
    @Column({ name: 'module_practice_internship' })
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
