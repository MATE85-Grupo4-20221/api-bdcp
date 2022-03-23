import {MigrationInterface, QueryRunner} from 'typeorm';

export class AddContentTable1647658981480 implements MigrationInterface {
    name = 'AddContentTable1647658981480';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`content\` (
                \`id\` int NOT NULL AUTO_INCREMENT, 
                \`code\` varchar(45) NULL, 
                \`name\` varchar(45) NULL, 
                \`department\` int NULL, 
                \`teaching_hours\` int NULL, 
                \`student_hours\` int NULL, 
                \`module\` varchar(45) NULL, 
                \`semester\` varchar(255) NULL, 
                \`syllabus\` varchar(2000) NULL, 
                \`program\` varchar(2000) NULL, 
                \`objective\` varchar(2000) NULL, 
                \`metolodogy\` varchar(2000) NULL, 
                \`bibliography\` varchar(2000) NULL, 
                \`user_id\` varchar(255) NOT NULL, 
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
                PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `ALTER TABLE \`content\` 
            ADD CONSTRAINT \`FK_23b0aa9f011580a4737f3a96d6d\` 
            FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) 
            ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`content\` 
            DROP FOREIGN KEY \`FK_23b0aa9f011580a4737f3a96d6d\``
        );
        await queryRunner.query('DROP TABLE `content`');
    }

}
