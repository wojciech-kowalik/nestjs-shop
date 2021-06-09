import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BasketService } from '../basket/basket.service';
import { GetProductListResponse, GetProductResponse } from "./interfaces/shop";
import { InjectRepository } from '@nestjs/typeorm';
import { ShopItem } from './shop-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
    @InjectRepository(ShopItem)
    private shopItemRepository: Repository<ShopItem>,
  ) {}

  async getProducts(): Promise<GetProductListResponse> {
    return await this.shopItemRepository.find();
  }

  async getProduct(id: string): Promise<ShopItem> {
    return await this.shopItemRepository.findOneOrFail(id);
  }

  async removeProduct(id: string) {
    await this.shopItemRepository.delete(id);
  }

  async addProduct(item: ShopItem): Promise<ShopItem> {
    return await this.shopItemRepository.save(item);
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).some((item) => item.name === name);
  }

  async getPriceOfProduct(name: string): Promise<number> {
    return (await this.getProducts()).find((item) => item.name === name).price;
  }
}
