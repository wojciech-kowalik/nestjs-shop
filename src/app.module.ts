import { Module } from '@nestjs/common';
import { BasketModule } from './basket/basket.module';
import { ShopModule } from './shop/shop.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(), BasketModule, ShopModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
