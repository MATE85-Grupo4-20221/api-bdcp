import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Component } from './Component';

@Entity('component_workload')
class ComponentWorkload {

    @PrimaryColumn()
    readonly id: string;

    @Column({name: 'teacher_theory_workload'})
        teacherTheoryWorkload: number;

    @Column({name: 'teacher_practice_workload'})
        teacherPracticeWorkload: number;

    @Column({name: 'teacher_theory_practice_workload'})
        teacherTheoryPracticeWorkload: number;

    @Column({name: 'teacher_internship_workload'})
        teacherInternshipWorkload: number;

    @Column({name: 'teacher_practice_internship_workload'})
        teacherPracticeInternshipWorkload: number;

    @Column({name: 'student_theory_workload'})
        studentTheoryWorkload: number;

    @Column({name: 'student_practice_workload'})
        studentPracticeWorkload: number;

    @Column({name: 'student_theory_practice_workload'})
        studentTheoryPracticeWorkload: number;

    @Column({name: 'student_internship_workload'})
        studentInternshipWorkload: number;

    @Column({name: 'student_practice_internship_workload'})
        studentPracticeInternshipWorkload: number;

    @Column({name: 'module_theory_workload'})
        moduleTheoryWorkload: number;

    @Column({name: 'module_practice_workload'})
        modulePracticeWorkload: number;

    @Column({name: 'module_theory_practice_workload'})
        moduleTheoryPracticeWorkload: number;

    @Column({name: 'module_internship_workload'})
        moduleInternshipWorkload: number;

    @Column({name: 'module_practice_internship_workload'})
        modulePracticeInternshipWorkload: number;

    @Column({name: 'component_id'})
        componentId: string;

    @OneToOne(() => Component, (component) => component.workload)
    @JoinColumn({name: 'component_id'})
        component: Component;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }

}

export { ComponentWorkload };
