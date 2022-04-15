import {MigrationInterface, QueryRunner} from "typeorm";

export class addComponentDraftTable1650030875182 implements MigrationInterface {
    name = 'addComponentDraftTable1650030875182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "component_drafts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" uuid NOT NULL, "workload_id" uuid, "code" character varying DEFAULT '', "name" character varying DEFAULT '', "department" character varying DEFAULT '', "program" character varying DEFAULT '', "semester" character varying DEFAULT '', "prerequeriments" character varying DEFAULT '', "methodology" character varying DEFAULT '', "objective" character varying DEFAULT '', "syllabus" character varying DEFAULT '', "bibliography" character varying DEFAULT '', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "REL_d67562e0144765b0c9b2b55570" UNIQUE ("workload_id"), CONSTRAINT "PK_ed9d7b7a98302a71818770f67a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "component_drafts" ADD CONSTRAINT "FK_8943af425c65f08185c0e3ba5ce" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "component_drafts" ADD CONSTRAINT "FK_d67562e0144765b0c9b2b555707" FOREIGN KEY ("workload_id") REFERENCES "component_workloads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "component_drafts" DROP CONSTRAINT "FK_d67562e0144765b0c9b2b555707"`);
        await queryRunner.query(`ALTER TABLE "component_drafts" DROP CONSTRAINT "FK_8943af425c65f08185c0e3ba5ce"`);
        await queryRunner.query(`DROP TABLE "component_drafts"`);
    }

}
