import {MigrationInterface, QueryRunner} from "typeorm";

export class AddWorkloadTable1648854995098 implements MigrationInterface {
    name = 'AddWorkloadTable1648854995098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workload" ("id" SERIAL NOT NULL, "student_theory" integer NOT NULL, "student_practice" integer NOT NULL, "student_intership" integer NOT NULL, "student_theory_practice" integer NOT NULL, "student_practice_internship" integer NOT NULL, "teacher_theory" integer NOT NULL, "teacher_practice" integer NOT NULL, "teacher_intership" integer NOT NULL, "teacher_theory_practice" integer NOT NULL, "teacher_practice_internship" integer NOT NULL, "module_theory" integer NOT NULL, "module_practice" integer NOT NULL, "module_intership" integer NOT NULL, "module_theory_practice" integer NOT NULL, "module_practice_internship" integer NOT NULL, CONSTRAINT "PK_0b09d853b01db433645eccc2304" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "component" DROP COLUMN "teaching_workload"`);
        await queryRunner.query(`ALTER TABLE "component" DROP COLUMN "student_workload"`);
        await queryRunner.query(`ALTER TABLE "component" DROP COLUMN "metolodogy"`);
        await queryRunner.query(`ALTER TABLE "component" ADD "methodology" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "component" ADD "workload_id" integer`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "UQ_55d581a6e731c7b955c03720571" UNIQUE ("workload_id")`);
        await queryRunner.query(`ALTER TABLE "component" ADD CONSTRAINT "FK_55d581a6e731c7b955c03720571" FOREIGN KEY ("workload_id") REFERENCES "workload"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "FK_55d581a6e731c7b955c03720571"`);
        await queryRunner.query(`ALTER TABLE "component" DROP CONSTRAINT "UQ_55d581a6e731c7b955c03720571"`);
        await queryRunner.query(`ALTER TABLE "component" DROP COLUMN "workload_id"`);
        await queryRunner.query(`ALTER TABLE "component" DROP COLUMN "methodology"`);
        await queryRunner.query(`ALTER TABLE "component" ADD "metolodogy" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "component" ADD "student_workload" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "component" ADD "teaching_workload" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "workload"`);
    }

}
