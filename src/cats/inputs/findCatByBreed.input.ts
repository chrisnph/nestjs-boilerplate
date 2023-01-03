import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsArray } from 'class-validator';
@InputType()
export class CatByBreedInput {
  @Field()
  @IsArray()
  @IsNotEmpty()
  readonly breed: [string];
}
