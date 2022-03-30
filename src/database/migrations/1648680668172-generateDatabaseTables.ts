import {MigrationInterface, QueryRunner} from "typeorm";

export class generateDatabaseTables1648680668172 implements MigrationInterface {
    name = 'generateDatabaseTables1648680668172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "component_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "component_id" uuid NOT NULL, "updated_by" uuid, "agreement_number" character varying, "agreement_date" TIMESTAMP WITH TIME ZONE, "description" character varying, "type" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_99322145f32cfa1d11f40f16470" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "components" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by" uuid NOT NULL, "status" character varying NOT NULL, "code" character varying NOT NULL, "name" character varying NOT NULL, "department" character varying NOT NULL, "program" character varying NOT NULL, "semester" character varying NOT NULL, "prerequeriments" character varying NOT NULL, "methodology" character varying NOT NULL, "objective" character varying NOT NULL, "syllabus" character varying NOT NULL, "bibliography" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_0d742661c63926321b5f5eac1ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "component_workloads" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "component_id" uuid NOT NULL, "teacher_theory" integer NOT NULL DEFAULT '0', "teacher_practice" integer NOT NULL DEFAULT '0', "teacher_theory_practice" integer NOT NULL DEFAULT '0', "teacher_internship" integer NOT NULL DEFAULT '0', "teacher_practice_internship" integer NOT NULL DEFAULT '0', "student_theory" integer NOT NULL DEFAULT '0', "student_practice" integer NOT NULL DEFAULT '0', "student_theory_practice" integer NOT NULL DEFAULT '0', "student_internship" integer NOT NULL DEFAULT '0', "student_practice_internship" integer NOT NULL DEFAULT '0', "module_theory" integer NOT NULL DEFAULT '0', "module_practice" integer NOT NULL DEFAULT '0', "module_theory_practice" integer NOT NULL DEFAULT '0', "module_internship" integer NOT NULL DEFAULT '0', "module_practice_internship" integer NOT NULL DEFAULT '0', CONSTRAINT "REL_67fcac71af8c284bea1c1d472b" UNIQUE ("component_id"), CONSTRAINT "PK_6b22dc5fc5d3afbf77b14834da0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "component_logs" ADD CONSTRAINT "FK_814bba35e0bbfa447f97dc5ac17" FOREIGN KEY ("component_id") REFERENCES "components"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "component_logs" ADD CONSTRAINT "FK_29ff82d098439f52a59acebaac5" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "components" ADD CONSTRAINT "FK_c3aee5bfd6d9c32e77fbdc17a46" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "component_workloads" ADD CONSTRAINT "FK_67fcac71af8c284bea1c1d472b3" FOREIGN KEY ("component_id") REFERENCES "components"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "component_workloads" DROP CONSTRAINT "FK_67fcac71af8c284bea1c1d472b3"`);
        await queryRunner.query(`ALTER TABLE "components" DROP CONSTRAINT "FK_c3aee5bfd6d9c32e77fbdc17a46"`);
        await queryRunner.query(`ALTER TABLE "component_logs" DROP CONSTRAINT "FK_29ff82d098439f52a59acebaac5"`);
        await queryRunner.query(`ALTER TABLE "component_logs" DROP CONSTRAINT "FK_814bba35e0bbfa447f97dc5ac17"`);
        await queryRunner.query(`DROP TABLE "component_workloads"`);
        await queryRunner.query(`DROP TABLE "components"`);
        await queryRunner.query(`DROP TABLE "component_logs"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
