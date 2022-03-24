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
                        name: 'created_by',
                        type: 'varchar',
                        length: '36',
                    },
                    {
                        name: 'workload_id',
                        type: 'varchar',
                        length: '36',
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                        isNullable: true,
                        length: '50',
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
                        length: '100',
                    },
                    {
                        name: 'department',
                        type: 'varchar',
                        isNullable: true,
                        length: '100',
                    },
                    {
                        name: 'type',
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
                        name: 'prerequeriments',
                        type: 'varchar',
                        isNullable: true,
                        length: '200',
                    },
                    {
                        name: 'methodology',
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
                        name: 'syllabus',
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
                        columnNames: ['created_by'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'fk_workload',
                        referencedTableName: 'workload',
                        referencedColumnNames: ['id'],
                        columnNames: ['workload_id'],
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
