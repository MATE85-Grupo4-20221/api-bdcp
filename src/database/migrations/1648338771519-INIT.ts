import {MigrationInterface, QueryRunner} from "typeorm";

export class User1648338771519 implements MigrationInterface {
    name = 'User1648338771519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "component" ("id" character varying NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "department" integer NOT NULL, "teaching_workload" integer NOT NULL, "student_workload" integer NOT NULL, "kind" character varying NOT NULL, "module" character varying NOT NULL, "semester" character varying NOT NULL, "syllabus" character varying NOT NULL, "program" character varying NOT NULL, "objective" character varying NOT NULL, "metolodogy" character varying NOT NULL, "bibliography" character varying NOT NULL, "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(), "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(), "user_id" character varying NOT NULL, CONSTRAINT "PK_c084eba2d3b157314de79135f09" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(), "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_f1dfba965ebd74db6dbe138c385" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_f1dfba965ebd74db6dbe138c385"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "component"`);
    }

}
