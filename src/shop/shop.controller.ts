import { Get, Inject, Controller } from '@nestjs/common';
import { ShopService } from './shop.service';
import { GetProductListResponse } from './interfaces/shop';

@Controller('shop')
export class ShopController {
  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/')
  getProductList(): GetProductListResponse {
    return this.shopService.getProducts();
  }
}
