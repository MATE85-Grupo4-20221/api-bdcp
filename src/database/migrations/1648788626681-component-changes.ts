import {MigrationInterface, QueryRunner} from "typeorm";

export class componentChanges1648788626681 implements MigrationInterface {
    name = 'componentChanges1648788626681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "components" DROP CONSTRAINT "FK_0b1ca44a41a5f6aead9de582a6b"`);
        await queryRunner.query(`ALTER TABLE "components" DROP CONSTRAINT "REL_0b1ca44a41a5f6aead9de582a6"`);
        await queryRunner.query(`ALTER TABLE "components" DROP COLUMN "workload_id"`);
        await queryRunner.query(`ALTER TABLE "components" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "component_workloads" ADD "component_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "component_workloads" ADD CONSTRAINT "UQ_67fcac71af8c284bea1c1d472b3" UNIQUE ("component_id")`);
        await queryRunner.query(`ALTER TABLE "components" DROP COLUMN "department"`);
        await queryRunner.query(`ALTER TABLE "components" ADD "department" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "component_workloads" ADD CONSTRAINT "FK_67fcac71af8c284bea1c1d472b3" FOREIGN KEY ("component_id") REFERENCES "components"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "component_workloads" DROP CONSTRAINT "FK_67fcac71af8c284bea1c1d472b3"`);
        await queryRunner.query(`ALTER TABLE "components" DROP COLUMN "department"`);
        await queryRunner.query(`ALTER TABLE "components" ADD "department" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "component_workloads" DROP CONSTRAINT "UQ_67fcac71af8c284bea1c1d472b3"`);
        await queryRunner.query(`ALTER TABLE "component_workloads" DROP COLUMN "component_id"`);
        await queryRunner.query(`ALTER TABLE "components" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "components" ADD "workload_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "components" ADD CONSTRAINT "REL_0b1ca44a41a5f6aead9de582a6" UNIQUE ("workload_id")`);
        await queryRunner.query(`ALTER TABLE "components" ADD CONSTRAINT "FK_0b1ca44a41a5f6aead9de582a6b" FOREIGN KEY ("workload_id") REFERENCES "component_workloads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
