import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Slogan } from './slogan.schema';
import { Model } from 'mongoose';
import { AddSloganDto } from './dto/add-slogan.dto';

@Injectable()
export class SloganService {
  constructor(
    @InjectModel(Slogan.name)
    private sloganModel: Model<Slogan>,
  ) {}

  async create(dto: AddSloganDto): Promise<Slogan> {
    const model = await this.sloganModel.create(dto);

    return model.save();
  }
}
