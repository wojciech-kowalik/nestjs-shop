import {MigrationInterface, QueryRunner} from "typeorm";

export class NewVersion1627323992529 implements MigrationInterface {
    name = 'NewVersion1627323992529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `shop_item` (`id` varchar(36) NOT NULL, `name` varchar(50) NOT NULL, `description` text NULL, `price` float(6,2) NOT NULL, `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(36) NOT NULL, `email` varchar(255) NOT NULL, `pwdHash` varchar(255) NOT NULL, `currentTokenId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `basket_item` (`id` varchar(36) NOT NULL, `count` int NOT NULL, `shopItemId` varchar(36) NULL, `userId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `basket_item` ADD CONSTRAINT `FK_49f1cc4b7986f420d0a68c51561` FOREIGN KEY (`shopItemId`) REFERENCES `shop_item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `basket_item` ADD CONSTRAINT `FK_408c366cc3e5c714072e9b3dfc1` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `basket_item` DROP FOREIGN KEY `FK_408c366cc3e5c714072e9b3dfc1`");
        await queryRunner.query("ALTER TABLE `basket_item` DROP FOREIGN KEY `FK_49f1cc4b7986f420d0a68c51561`");
        await queryRunner.query("DROP TABLE `basket_item`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `shop_item`");
    }

}
