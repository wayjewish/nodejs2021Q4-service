import {MigrationInterface, QueryRunner} from "typeorm";

export class MigrationFile1644176937370 implements MigrationInterface {
    name = 'MigrationFile1644176937370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "UQ_e74b542753b5bf00d728607f81a" UNIQUE ("login")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "UQ_e74b542753b5bf00d728607f81a"`);
    }

}
