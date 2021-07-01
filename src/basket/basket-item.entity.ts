import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShopItem } from '../shop/shop-item.entity';
import { User } from '../user/user.entity';

@Entity()
export class BasketItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  count: number;

  @ManyToOne((type) => ShopItem, (entity) => entity.basketItem)
  @JoinColumn()
  shopItem: ShopItem;

  @ManyToOne((type) => User, (entity) => entity.basketItems)
  @JoinColumn()
  user: User;
}
