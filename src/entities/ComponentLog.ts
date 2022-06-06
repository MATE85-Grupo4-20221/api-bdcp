import { Column, Entity, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

import { Component } from './Component';
import { User } from './User';
import { ComponentLogType } from '../interfaces/ComponentLogType';
import { ComponentDraft } from './ComponentDraft';

@Entity('component_logs')
class ComponentLog {

    @PrimaryGeneratedColumn('uuid')
        id: string;

    @Column({ name: 'component_id', nullable: true })
        componentId?: string | null;

    @Column({ name: 'component_draft_id', nullable: true })
        draftId?: string | null;

    @Column({ name: 'updated_by', nullable: true })
        updatedBy?: string;

    @Column({ name: 'agreement_number', nullable: true })
        agreementNumber?: string;

    @Column({ name: 'agreement_date', type: 'timestamptz',  nullable: true })
        agreementDate?: Date;

    @Column({ nullable: true })
        description?: string;

    @Column({ enum: ComponentLogType })
        type: ComponentLogType;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
        createdAt: Date;

    @ManyToOne(() => Component, (component) => component.logs)
    @JoinColumn({ name: 'component_id' })
        component?: Component;

    @ManyToOne(() => ComponentDraft, (draft) => draft.logs)
    @JoinColumn({ name: 'component_draft_id' })
        draft?: ComponentDraft;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'updated_by' })
        user: User;

}

export { ComponentLog };
