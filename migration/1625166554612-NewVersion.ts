import {MigrationInterface, QueryRunner} from "typeorm";

export class NewVersion1625166554612 implements MigrationInterface {
    name = 'NewVersion1625166554612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `basket_item` ADD `userId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `price` `price` float(6,2) NOT NULL");
        await queryRunner.query("ALTER TABLE `basket_item` ADD CONSTRAINT `FK_408c366cc3e5c714072e9b3dfc1` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `basket_item` DROP FOREIGN KEY `FK_408c366cc3e5c714072e9b3dfc1`");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `price` `price` float(7,2) NOT NULL");
        await queryRunner.query("ALTER TABLE `basket_item` DROP COLUMN `userId`");
    }

}
