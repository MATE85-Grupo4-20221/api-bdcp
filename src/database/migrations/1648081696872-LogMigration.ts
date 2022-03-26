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
                        name: 'FK_140407b98b950fb9e9618ffaee0',
                        referencedTableName: 'components',
                        referencedColumnNames: ['id'],
                        columnNames: ['component_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'FK_7794ebe3a888bccd448dffad054',
                        referencedTableName: 'users',
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
