import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class ComponentMigration1647991015478 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'component',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        length: '36',
                    },
                    {
                        name: 'user_id',
                        type: 'varchar',
                        length: '36',
                    },
                    {
                        name: 'code',
                        type: 'varchar',
                        isNullable: true,
                        length: '50',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: true,
                        length: '50',
                    },
                    {
                        name: 'department',
                        type: 'varchar',
                        isNullable: true,
                        length: '50',
                    },
                    {
                        name: 'kind',
                        type: 'varchar',
                        isNullable: true,
                        length: '50',
                    },
                    {
                        name: 'module',
                        type: 'varchar',
                        isNullable: true,
                        length: '50',
                    },
                    {
                        name: 'program',
                        type: 'varchar',
                        isNullable: true,
                        length: '200',
                    },
                    {
                        name: 'semester',
                        type: 'varchar',
                        isNullable: true,
                        length: '50',
                    },
                    {
                        name: 'syllabus',
                        type: 'varchar',
                        isNullable: true,
                        length: '2000',
                    },
                    {
                        name: 'objective',
                        type: 'varchar',
                        isNullable: true,
                        length: '2000',
                    },
                    {
                        name: 'metodology',
                        type: 'varchar',
                        isNullable: true,
                        length: '2000',
                    },
                    {
                        name: 'bibliography',
                        type: 'varchar',
                        isNullable: true,
                        length: '2000',
                    },
                    {
                        name: 'teaching_workload',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'student_workload',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    }
                ],
                foreignKeys:[
                    {
                        name: 'fk_user',
                        referencedTableName: 'user',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('component');
    }

}