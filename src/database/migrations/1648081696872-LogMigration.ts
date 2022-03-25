import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class LogMigration1648081696872 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'component_logs',
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
                        name: 'updated_by',
                        type: 'varchar',
                        length: '36',
                    },
                    {
                        name: 'minute_number',
                        type: 'varchar',
                        isNullable: true,
                        length: '50',
                    },
                    {
                        name: 'minute_date',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: true,
                        length: '200',
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        isNullable: true,
                        length: '200',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    }
                ],
                foreignKeys:[
                    {
                        name: 'fk_component',
                        referencedTableName: 'component',
                        referencedColumnNames: ['id'],
                        columnNames: ['component_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'fk_user',
                        referencedTableName: 'user',
                        referencedColumnNames: ['id'],
                        columnNames: ['updated_by'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('component_logs');
    }

}
