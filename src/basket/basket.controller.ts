import {
  Body,
  Controller,
  Delete,
  Inject,
  Post,
  Get,
  Param,
} from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';
import {
  ProductsFromBasketResponse,
  GetTotalPriceResponse,
  GetStatisticsResponse,
} from '../shop/interfaces/basket';
import {
  AddProductToBasketResponse,
  RemoveProductFromBasketResponse,
} from '../shop/interfaces/basket';
import { BasketService } from './basket.service';

@Controller('basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}

  @Post('/')
  create(@Body() item: AddProductDto): Promise<AddProductToBasketResponse> {
    return this.basketService.add(item);
  }

  @Delete('/clear/:userId')
  clear(@Param('userId') userId: string) {
    return this.basketService.clearBasket(userId);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<RemoveProductFromBasketResponse> {
    return this.basketService.remove(id);
  }

  @Get('/admin')
  getBasketForAdmin(): Promise<ProductsFromBasketResponse> {
    return this.basketService.getAllForAdmin();
  }

  @Get('/statistics')
  getStatistics(): Promise<GetStatisticsResponse> {
    return this.basketService.getStatistics();
  }

  @Get('/:userId')
  getBasket(
    @Param('userId') userId: string,
  ): Promise<ProductsFromBasketResponse> {
    return this.basketService.getAllForUser(userId);
  }

  @Get('/total-price/:userId')
  getTotalPrice(
    @Param('userId') userId: string,
  ): Promise<GetTotalPriceResponse> {
    return this.basketService.getTotalPrice(userId);
  }
}
