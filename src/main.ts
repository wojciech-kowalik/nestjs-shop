import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  (app as NestExpressApplication).use(helmet());
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
