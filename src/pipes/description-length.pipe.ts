import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { SloganDto } from '../slogan/dto/slogan.dto';

interface DescriptionLengthPipeOptions {
  minLength: number;
}

@Injectable()
export class DescriptionLengthPipe implements PipeTransform {
  constructor(private options: DescriptionLengthPipeOptions) {}

  transform(value: any, metadata: ArgumentMetadata): number {
    const sloganDto = value as SloganDto;
    const descriptionLength = sloganDto.description.length;

    if (descriptionLength < this.options.minLength) {
      throw new BadRequestException(
        `Minimum description length is ${this.options.minLength}`,
      );
    }

    return value;
  }
}
