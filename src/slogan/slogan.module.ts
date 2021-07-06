import { Module } from '@nestjs/common';
import { SloganService } from './slogan.service';
import { SloganController } from './slogan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Slogan, SloganSchema } from './slogan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Slogan.name,
        schema: SloganSchema,
      },
    ]),
  ],
  providers: [SloganService],
  controllers: [SloganController],
})
export class SloganModule {}
