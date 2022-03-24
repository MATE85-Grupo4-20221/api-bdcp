import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class WorkloadMigration1648044994155 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'workload',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        length: '36',
                    },
                    {
                        name: 'teacher_theory',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'teacher_practice',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'teacher_theory_practice',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'teacher_internship',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'teacher_practice_internship',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'student_theory',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'student_practice',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'student_theory_practice',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'student_internship',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'student_practice_internship',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'module_theory',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'module_practice',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'module_theory_practice',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'module_internship',
                        type: 'int',
                        default: 0
                    },
                    {
                        name: 'module_practice_internship',
                        type: 'int',
                        default: 0
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('component_workload');
    }

}
