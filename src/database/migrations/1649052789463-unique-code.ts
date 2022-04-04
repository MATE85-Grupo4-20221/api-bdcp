import {MigrationInterface, QueryRunner} from "typeorm";

export class uniqueCode1649052789463 implements MigrationInterface {
    name = 'uniqueCode1649052789463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "components" ALTER COLUMN "status" SET DEFAULT 'draft'`);
        await queryRunner.query(`ALTER TABLE "components" ADD CONSTRAINT "UQ_5409124de81d8d24ef76b4a5315" UNIQUE ("code")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "components" DROP CONSTRAINT "UQ_5409124de81d8d24ef76b4a5315"`);
        await queryRunner.query(`ALTER TABLE "components" ALTER COLUMN "status" DROP DEFAULT`);
    }

}
