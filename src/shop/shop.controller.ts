import {
  Get,
  Inject,
  Controller,
  Param,
  Delete,
  Post,
  Body,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import {
  GetPaginatedListResponse,
  GetProductResponse,
} from './interfaces/shop';
import { ShopItem } from './shop-item.entity';

@Controller('shop')
export class ShopController {
  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/:page')
  getList(
    @Param('page', ParseIntPipe) page: number,
  ): Promise<GetPaginatedListResponse> {
    return this.shopService.getProducts(page);
  }

  @Get('/:id')
  getProduct(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<GetProductResponse> {
    return this.shopService.getProduct(id);
  }

  @Delete('/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.shopService.removeProduct(id);
  }

  @Post('/')
  add(@Body() shopItem: ShopItem): Promise<ShopItem> {
    return this.shopService.addProduct(shopItem);
  }
}
