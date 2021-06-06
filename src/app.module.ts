import { Module } from '@nestjs/common';
import { BasketModule } from './basket/basket.module';
import { ShopModule } from './shop/shop.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), BasketModule, ShopModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
