import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class BannerType {
  @Field(() => ID)
  id: string;
}
