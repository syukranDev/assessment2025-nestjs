import { MigrationInterface, QueryRunner } from "typeorm";

export class FixEntitiesPostsUsers1759303720120 implements MigrationInterface {
    name = 'FixEntitiesPostsUsers1759303720120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "UQ_5378807f28855132d256a3e45cc"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "UQ_5378807f28855132d256a3e45cc" UNIQUE ("description")`);
    }

}
