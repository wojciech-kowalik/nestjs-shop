import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Slogan extends Document {
  @Prop()
  id: string;

  @Prop()
  description: string;

  @Prop()
  isHighlighted: boolean;
}

export const SloganSchema = SchemaFactory.createForClass(Slogan);
