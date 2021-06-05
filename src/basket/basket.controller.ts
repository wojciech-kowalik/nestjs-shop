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
  create(@Body() item: AddProductDto): AddProductToBasketResponse {
    return this.basketService.add(item);
  }

  @Delete('/:index')
  delete(@Param('index') index: string): RemoveProductFromBasketResponse {
    return this.basketService.remove(+index);
  }

  @Get('/')
  getAll(): ProductsFromBasketResponse {
    return this.basketService.getAll();
  }

  @Get('/total-price')
  getTotalPrice(): GetTotalPriceResponse {
    return this.basketService.getTotalPrice();
  }
}
