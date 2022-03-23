import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class ComponentWorkloadMigration1648044994155 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'component_workload',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        length: '36',
                    },
                    {
                        name: 'component_id',
                        type: 'varchar',
                        length: '36',
                    },
                    {
                        name: 'teacher_theory_workload',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'teacher_practice_workload',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'teacher_theory_practice_workload',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'teacher_internship_workload',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'teacher_practice_internship_workload',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'student_theory_workload',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'student_practice_workload',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'student_theory_practice_workload',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'student_internship_workload',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'student_practice_internship_workload',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'module_theory_workload',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'module_practice_workload',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'module_theory_practice_workload',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'module_internship_workload',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'module_practice_internship_workload',
                        type: 'int',
                        default: 0
                    },
                ],
                foreignKeys:[
                    {
                        name: 'fk_component',
                        referencedTableName: 'component',
                        referencedColumnNames: ['id'],
                        columnNames: ['component_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('component_workload');
    }

}
