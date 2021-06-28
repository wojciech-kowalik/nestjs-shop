import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ShopItemInterface } from './interfaces/shop';
import { BasketItem } from '../basket/basket-item.entity';

@Entity()
export class ShopItem implements ShopItemInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    type: 'text',
    default: null,
    nullable: true,
  })
  description: string | null;

  @Column({
    type: 'float',
    precision: 7,
    scale: 2,
  })
  price: number;

  @OneToOne((type) => BasketItem, (entity) => entity.shopItem)
  basketItem: BasketItem;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
