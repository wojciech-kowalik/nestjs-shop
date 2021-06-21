import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AddProductDto } from './dto/add-product.dto';
import { ShopItem } from "../shop/shop-item.entity";

@Entity()
export class BasketItem implements AddProductDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  count: number;

  @OneToOne((type) => ShopItem, (entity) => entity.basketItem)
  @JoinColumn()
  shopItem: ShopItem;
}
