import { Module } from '@nestjs/common';
import { BasketModule } from './basket/basket.module';
import { ShopModule } from './shop/shop.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { SloganModule } from './slogan/slogan.module';
import { CronModule } from './cron/cron.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION_STRING),
    BasketModule,
    ShopModule,
    UserModule,
    SloganModule,
    CronModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
