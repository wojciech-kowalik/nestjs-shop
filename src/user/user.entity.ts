import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BasketItem } from '../basket/basket-item.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 255,
  })
  email: string;

  @OneToMany((type) => BasketItem, (entity) => entity.user)
  basketItems: BasketItem[];
}
