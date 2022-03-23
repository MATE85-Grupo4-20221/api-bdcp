import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserMigration1647364386326 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                        length: "36",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                        length: "50",
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "50",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    }
                ]
            })
        );

        //password = sysadmin@bdcp.com.mate85
        await queryRunner.query("INSERT INTO user (id, name, email, password) VALUES ('4079861b-1a2f-4c31-b8fd-b35987d6bd85', 'Sys Admin', 'sysadmin@bdcp.com', 'bc9c81c6d9bdd0ac3eb94ac3588a29957bde03cbdf6e3ac7885012d92d7e8fb5')");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }

}
