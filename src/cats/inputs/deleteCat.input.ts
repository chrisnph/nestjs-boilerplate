import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DeleteCatInput {
  @Field()
  readonly id: string;
}
