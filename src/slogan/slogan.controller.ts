import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Slogan } from './slogan.schema';
import { SloganService } from './slogan.service';
import { AddSloganDto } from './dto/add-slogan.dto';

@Controller('slogan')
export class SloganController {
  constructor(@Inject(SloganService) private sloganService: SloganService) {}

  @Post('/')
  create(@Body() addSloganDto: AddSloganDto): Promise<Slogan> {
    return this.sloganService.create(addSloganDto);
  }
}
