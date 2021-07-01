import {MigrationInterface, QueryRunner} from "typeorm";

export class NewVersion1625166947221 implements MigrationInterface {
    name = 'NewVersion1625166947221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `REL_49f1cc4b7986f420d0a68c5156` ON `basket_item`");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `price` `price` float(7,2) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `price` `price` float(6,2) NOT NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_49f1cc4b7986f420d0a68c5156` ON `basket_item` (`shopItemId`)");
    }

}
