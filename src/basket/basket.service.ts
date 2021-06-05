import { Inject, Injectable } from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';
import { ShopService } from '../shop/shop.service';
import {
  GetTotalPriceResponse,
  ProductsFromBasketResponse,
} from '../shop/interfaces/basket';
import {
  AddProductToBasketResponse,
  RemoveProductFromBasketResponse,
} from '../shop/interfaces/basket';

@Injectable()
export class BasketService {
  private items: AddProductDto[] = [];

  constructor(@Inject(ShopService) private shopService: ShopService) {}

  add(item: AddProductDto): AddProductToBasketResponse {
    this.items.push(item);

    if (!this.shopService.hasProduct(item.name)) {
      return {
        isSuccess: false,
      };
    }

    return {
      isSuccess: true,
      index: this.items.length - 1,
    };
  }

  remove(index: number): RemoveProductFromBasketResponse {
    this.items.splice(index, 1);
    return {
      isSuccess: true,
    };
  }

  getAll(): ProductsFromBasketResponse {
    return this.items;
  }

  getTotalPrice(): GetTotalPriceResponse {
    if (!this.items.every((item: AddProductDto) => this.shopService.hasProduct(item.name))) {
      return {
        isSuccess: false,
      };
    }

    return this.items
      .map(
        (item: AddProductDto) =>
          this.shopService.getPriceOfProduct(item.name) * item.count * 1.23,
      )
      .reduce((prev, curr) => prev + curr, 0);
  }
}
