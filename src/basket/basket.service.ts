import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';
import { ShopService } from '../shop/shop.service';
import { GetTotalPriceResponse } from '../shop/interfaces/basket';
import {
  AddProductToBasketResponse,
  RemoveProductFromBasketResponse,
} from '../shop/interfaces/basket';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasketItem } from './basket-item.entity';

@Injectable()
export class BasketService {
  constructor(
    @Inject(forwardRef(() => ShopService))
    private shopService: ShopService,
    @InjectRepository(BasketItem)
    private basketItemRepository: Repository<BasketItem>,
  ) {}

  async add(item: AddProductDto): Promise<AddProductToBasketResponse> {
    const shopItem = await this.shopService.getProduct(item.id);

    if (!shopItem) {
      return {
        isSuccess: false,
      };
    }

    const saved = await this.basketItemRepository.save(item);

    saved.shopItem = shopItem;
    await this.basketItemRepository.save(saved);

    return {
      isSuccess: true,
      id: saved.id,
    };
  }

  async remove(id: string): Promise<RemoveProductFromBasketResponse> {
    const item = await this.basketItemRepository.findOneOrFail(id);
    await this.basketItemRepository.remove(item);

    return {
      isSuccess: true,
    };
  }

  async clearBasket() {
    await this.basketItemRepository.delete({});
  }

  async getAll(): Promise<BasketItem[]> {
    return await this.basketItemRepository.find({
      relations: ['shopItem'],
    });
  }

  async getTotalPrice(): Promise<GetTotalPriceResponse> {
    const items = await this.getAll();
    if (
      !items.every((item: AddProductDto) =>
        this.shopService.hasProduct(item.id),
      )
    ) {
      return {
        isSuccess: false,
      };
    }

    return items
      .map((item: BasketItem) => item.shopItem.price * item.count * 1.23)
      .reduce((prev, curr) => prev + curr, 0);
  }
}
