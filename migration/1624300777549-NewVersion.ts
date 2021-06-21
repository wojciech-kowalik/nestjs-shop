import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewVersion1624300777549 implements MigrationInterface {
  name = 'NewVersion1624300777549';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `shop_item` CHANGE `price` `price` float(7,2) NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `shop_item` CHANGE `price` `price` float(6,2) NOT NULL',
    );
  }
}
