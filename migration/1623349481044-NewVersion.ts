import {MigrationInterface, QueryRunner} from "typeorm";

export class NewVersion1623349481044 implements MigrationInterface {
    name = 'NewVersion1623349481044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `shop_item` ADD `name` varchar(50) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item` DROP COLUMN `name`");
        await queryRunner.query("ALTER TABLE `shop_item` ADD `name` varchar(60) NOT NULL");
    }

}
