import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from 'typeorm';

export class WorkloadMigration1648044994155 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'component_workloads',
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

        await queryRunner.addColumn(
            'components', 
            new TableColumn({
                name: 'workload_id',
                type: 'varchar',
                length: '36',
            })
        );

        await queryRunner.createForeignKey(
            'components',
            new TableForeignKey({
                name: 'fk_workload',
                referencedTableName: 'component_workloads',
                referencedColumnNames: ['id'],
                columnNames: ['workload_id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('component_workloads');

        await queryRunner.dropColumn('components',  'workload_id');

        await queryRunner.dropForeignKey('components', 'fk_workload');
    }

}
