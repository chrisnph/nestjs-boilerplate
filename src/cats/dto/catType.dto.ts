import { Field, ObjectType, Int, ID } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { PaginationType } from 'src/mongooseQueryHelper/pagination/dto/pagination.dto';

@ObjectType()
export class CatType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  readonly name: string;

  @Field(() => Int)
  readonly age: number;

  @Field(() => String)
  readonly owner: string;

  @Field(() => [String])
  readonly breed: [string];

  @Field(() => String)
  readonly createdAt: string;

  @Field(() => String)
  readonly updatedAt: string;
}

@ObjectType()
export class Cat extends CatType {
  @Field(() => GraphQLJSON)
  cats: [CatType];

  @Field(() => PaginationType)
  pageInfo: PaginationType;
}
