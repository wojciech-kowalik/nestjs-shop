import {MigrationInterface, QueryRunner} from "typeorm";

export class NewVersion1624304165285 implements MigrationInterface {
    name = 'NewVersion1624304165285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `basket_item` CHANGE `name` `shopItemId` varchar(50) NOT NULL");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `price` `price` float(6,2) NOT NULL");
        await queryRunner.query("ALTER TABLE `basket_item` DROP COLUMN `shopItemId`");
        await queryRunner.query("ALTER TABLE `basket_item` ADD `shopItemId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `basket_item` ADD UNIQUE INDEX `IDX_49f1cc4b7986f420d0a68c5156` (`shopItemId`)");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_49f1cc4b7986f420d0a68c5156` ON `basket_item` (`shopItemId`)");
        await queryRunner.query("ALTER TABLE `basket_item` ADD CONSTRAINT `FK_49f1cc4b7986f420d0a68c51561` FOREIGN KEY (`shopItemId`) REFERENCES `shop_item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `basket_item` DROP FOREIGN KEY `FK_49f1cc4b7986f420d0a68c51561`");
        await queryRunner.query("DROP INDEX `REL_49f1cc4b7986f420d0a68c5156` ON `basket_item`");
        await queryRunner.query("ALTER TABLE `basket_item` DROP INDEX `IDX_49f1cc4b7986f420d0a68c5156`");
        await queryRunner.query("ALTER TABLE `basket_item` DROP COLUMN `shopItemId`");
        await queryRunner.query("ALTER TABLE `basket_item` ADD `shopItemId` varchar(50) NOT NULL");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `price` `price` float(7,2) NOT NULL");
        await queryRunner.query("ALTER TABLE `basket_item` CHANGE `shopItemId` `name` varchar(50) NOT NULL");
    }

}
