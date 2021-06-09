import { Get, Inject, Controller, Param, Delete, Post, Body } from "@nestjs/common";
import { ShopService } from './shop.service';
import { GetProductListResponse, GetProductResponse } from './interfaces/shop';
import { ShopItem } from './shop-item.entity';

@Controller('shop')
export class ShopController {
  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/')
  getList(): Promise<GetProductListResponse> {
    return this.shopService.getProducts();
  }

  @Get('/:id')
  getProduct(@Param('id') id: string): Promise<GetProductResponse> {
    return this.shopService.getProduct(id);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.shopService.removeProduct(id);
  }

  @Post('/')
  add(@Body() shopItem: ShopItem): Promise<ShopItem> {
    return this.shopService.addProduct(shopItem);
  }
}
