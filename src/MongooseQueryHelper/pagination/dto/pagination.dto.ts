import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationType {
  @Field(() => Number || null, { nullable: true })
  totalDocs: number | null;

  @Field(() => Number || null, { nullable: true })
  limit: number | null;

  @Field(() => Number || null, { nullable: true })
  totalPages: number | null;

  @Field(() => Number || null, { nullable: true })
  page: number | null;

  @Field(() => Number || null, { nullable: true })
  pagingCounter: number | null;

  @Field(() => Boolean, { nullable: true })
  hasPrevPage: boolean;

  @Field(() => Boolean, { nullable: true })
  hasNextPage: boolean;

  @Field(() => Number || null, { nullable: true })
  prevPage: number | null;

  @Field(() => Number || null, { nullable: true })
  nextPage: number | null;
}
