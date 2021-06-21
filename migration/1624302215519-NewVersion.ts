import {MigrationInterface, QueryRunner} from "typeorm";

export class NewVersion1624302215519 implements MigrationInterface {
    name = 'NewVersion1624302215519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `basket_item` (`id` varchar(36) NOT NULL, `name` varchar(50) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `price` `price` float(6,2) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `price` `price` float(7,2) NOT NULL");
        await queryRunner.query("DROP TABLE `basket_item`");
    }

}
