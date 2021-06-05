import { Module } from '@nestjs/common';
import { ShopController } from './shop/shop.controller';
import { ShopService } from './shop/shop.service';
import { BasketController } from './basket/basket.controller';
import { BasketService } from './basket/basket.service';

@Module({
  imports: [],
  controllers: [ShopController, BasketController],
  providers: [ShopService, BasketService],
})
export class AppModule {}
