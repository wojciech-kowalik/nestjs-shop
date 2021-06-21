import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BasketService } from '../basket/basket.service';
import {
  GetPaginatedListResponse,
  GetProductListResponse,
} from './interfaces/shop';
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

  async getProducts(page = 1): Promise<GetPaginatedListResponse> {
    const maxPerPage = 3;
    const [items, count] = await this.shopItemRepository.findAndCount({
      skip: maxPerPage * (page - 1),
      take: maxPerPage,
    });

    const totalPages = Math.ceil(count / maxPerPage);

    return {
      items,
      totalPages,
    };
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
    return (await this.getProducts()).items.some((item) => item.id === name);
  }

  async getPriceOfProduct(name: string): Promise<number> {
    return (await this.getProducts()).items.find((item) => item.id === name)
      .price;
  }
}
