import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronService {
  @Cron(CronExpression.EVERY_5_MINUTES)
  showInformation() {
    console.log('Current system time: ', new Date());
  }
}
