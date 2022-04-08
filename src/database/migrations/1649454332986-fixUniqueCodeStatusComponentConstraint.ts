import {MigrationInterface, QueryRunner} from "typeorm";

export class fixUniqueCodeStatusComponentConstraint1649454332986 implements MigrationInterface {
    name = 'fixUniqueCodeStatusComponentConstraint1649454332986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "components" DROP CONSTRAINT "UQ_5409124de81d8d24ef76b4a5315"`);
        await queryRunner.query(`ALTER TABLE "components" ADD CONSTRAINT "UQ_3499dd0a43fe5f95f11ac9eb935" UNIQUE ("code", "status")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "components" DROP CONSTRAINT "UQ_3499dd0a43fe5f95f11ac9eb935"`);
        await queryRunner.query(`ALTER TABLE "components" ADD CONSTRAINT "UQ_5409124de81d8d24ef76b4a5315" UNIQUE ("code")`);
    }

}
