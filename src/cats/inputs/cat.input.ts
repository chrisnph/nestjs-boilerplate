import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';
import { GraphQLJSON } from 'graphql-type-json';

@InputType()
export class CatInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  readonly age: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly owner: string;

  @Field(() => GraphQLJSON)
  @IsArray()
  @IsNotEmpty()
  readonly breed: [string];
}
