import {MigrationInterface, QueryRunner} from "typeorm";

export class NewVersion1624302374606 implements MigrationInterface {
    name = 'NewVersion1624302374606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `basket_item` ADD `count` int NOT NULL");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `price` `price` float(7,2) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `price` `price` float(6,2) NOT NULL");
        await queryRunner.query("ALTER TABLE `basket_item` DROP COLUMN `count`");
    }

}
