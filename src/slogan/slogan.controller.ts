import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Slogan } from './slogan.schema';
import { SloganService } from './slogan.service';
import { SloganDto } from './dto/slogan.dto';

@Controller('slogan')
export class SloganController {
  constructor(@Inject(SloganService) private sloganService: SloganService) {}

  @Post('/')
  create(@Body() sloganDto: SloganDto): Promise<Slogan> {
    return this.sloganService.create(sloganDto);
  }

  @Get('/:id')
  get(@Param('id') id: string): Promise<Slogan> {
    return this.sloganService.get(id);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    this.sloganService.remove(id);
  }

  @Put('/:id')
  update(@Body() sloganDto: SloganDto, @Param('id') id: string): Promise<Slogan> {
    return this.sloganService.update(id, sloganDto);
  }
}
