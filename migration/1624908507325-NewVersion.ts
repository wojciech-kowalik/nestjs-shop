import {MigrationInterface, QueryRunner} from "typeorm";

export class NewVersion1624908507325 implements MigrationInterface {
    name = 'NewVersion1624908507325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_49f1cc4b7986f420d0a68c5156` ON `basket_item`");
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(36) NOT NULL, `email` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `price` `price` float(7,2) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `price` `price` float(6,2) NOT NULL");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_49f1cc4b7986f420d0a68c5156` ON `basket_item` (`shopItemId`)");
    }

}
