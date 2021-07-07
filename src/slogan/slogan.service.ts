import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Slogan } from './slogan.schema';
import { Model } from 'mongoose';
import { SloganDto } from './dto/slogan.dto';

@Injectable()
export class SloganService {
  constructor(
    @InjectModel(Slogan.name)
    private sloganModel: Model<Slogan>,
  ) {}

  async create(dto: SloganDto): Promise<Slogan> {
    const model = await this.sloganModel.create(dto);

    return model.save();
  }

  async get(id: string): Promise<Slogan> {
    return this.sloganModel.findById(id).exec();
  }

  async remove(id: string) {
    return this.sloganModel.findByIdAndRemove(id).exec();
  }

  async update(id: string, sloganDto: SloganDto) {
    const { description, isHighlighted } = sloganDto;
    return this.sloganModel
      .findByIdAndUpdate(id, { description, isHighlighted }, { new: true })
      .exec();
  }
}
