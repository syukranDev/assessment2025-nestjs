import { MigrationInterface, QueryRunner } from "typeorm";

export class PostTagsRename1759396156688 implements MigrationInterface {
    name = 'PostTagsRename1759396156688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "PostTags" ("postsId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_b521d694a77055e5f7e0cb93a1c" PRIMARY KEY ("postsId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9605600bd3cace128539d8e5b9" ON "PostTags" ("postsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3f813e9a647907737356accb80" ON "PostTags" ("tagsId") `);
        await queryRunner.query(`ALTER TABLE "PostTags" ADD CONSTRAINT "FK_9605600bd3cace128539d8e5b97" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "PostTags" ADD CONSTRAINT "FK_3f813e9a647907737356accb808" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PostTags" DROP CONSTRAINT "FK_3f813e9a647907737356accb808"`);
        await queryRunner.query(`ALTER TABLE "PostTags" DROP CONSTRAINT "FK_9605600bd3cace128539d8e5b97"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3f813e9a647907737356accb80"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9605600bd3cace128539d8e5b9"`);
        await queryRunner.query(`DROP TABLE "PostTags"`);
    }

}
