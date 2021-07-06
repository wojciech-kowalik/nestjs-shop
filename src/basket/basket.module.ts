import { forwardRef, Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { ShopModule } from '../shop/shop.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketItem } from './basket-item.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    forwardRef(() => ShopModule),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([BasketItem]),
  ],
  controllers: [BasketController],
  providers: [BasketService],
  exports: [BasketService],
})
export class BasketModule {}
