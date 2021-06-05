import { Module } from '@nestjs/common';
import { BasketModule } from "./basket/basket.module";
import { ShopModule } from "./shop/shop.module";

@Module({
  imports: [BasketModule, ShopModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
