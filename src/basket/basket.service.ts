import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';
import { ShopService } from '../shop/shop.service';
import {
  GetStatisticsResponse,
  GetTotalPriceResponse,
} from '../shop/interfaces/basket';
import {
  AddProductToBasketResponse,
  RemoveProductFromBasketResponse,
} from '../shop/interfaces/basket';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { BasketItem } from './basket-item.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class BasketService {
  constructor(
    @Inject(forwardRef(() => ShopService))
    private shopService: ShopService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    @InjectRepository(BasketItem)
    private basketItemRepository: Repository<BasketItem>,
  ) {}

  async add(
    item: AddProductDto,
    user: User,
  ): Promise<AddProductToBasketResponse> {
    const shopItem = await this.shopService.getProduct(item.productId);

    if (!shopItem) {
      return {
        isSuccess: false,
      };
    }

    const saved = await this.basketItemRepository.save(item);

    saved.shopItem = shopItem;
    saved.user = user;
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

  async clearBasket(userId: string) {
    const user = await this.userService.getUser(userId);

    await this.basketItemRepository.delete({ user });
  }

  async getAllForUser(userId: string): Promise<BasketItem[]> {
    const user = await this.userService.getUser(userId);

    return await this.basketItemRepository.find({
      where: {
        user,
      },
      relations: ['shopItem'],
    });
  }

  async getAllForAdmin(): Promise<BasketItem[]> {
    return await this.basketItemRepository.find({
      relations: ['shopItem', 'user'],
    });
  }

  async getTotalPrice(userId: string): Promise<GetTotalPriceResponse> {
    const items = await this.getAllForUser(userId);
    if (!items.every((item) => this.shopService.hasProduct(item.id))) {
      return {
        isSuccess: false,
      };
    }

    return items
      .map((item: BasketItem) => item.shopItem.price * item.count * 1.23)
      .reduce((prev, curr) => prev + curr, 0);
  }

  async getStatistics(): Promise<GetStatisticsResponse> {
    const { itemInBasketAvgPrice } = await getConnection()
      .createQueryBuilder()
      .select('AVG(shopItem.price)', 'itemInBasketAvgPrice')
      .from(BasketItem, 'basketItem')
      .leftJoinAndSelect('basketItem.shopItem', 'shopItem')
      .groupBy('shopItem.id')
      .getRawOne();

    const allItemsInBasket = await this.getAllForAdmin();

    const baskets: {
      [userId: string]: number;
    } = {};

    for (const oneItemInBasket of allItemsInBasket) {
      baskets[oneItemInBasket.user.id] = baskets[oneItemInBasket.user.id] || 0;

      baskets[oneItemInBasket.user.id] +=
        oneItemInBasket.shopItem.price * oneItemInBasket.count * 1.23;
    }

    const basketValues = Object.values(baskets);

    const basketAvgTotalPrice =
      basketValues.reduce((prev, curr) => prev + curr, 0) / basketValues.length;

    return {
      itemInBasketAvgPrice,
      basketAvgTotalPrice,
    };
  }
}
