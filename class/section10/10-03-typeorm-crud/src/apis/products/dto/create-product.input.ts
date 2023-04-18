import { Field, InputType, Int } from '@nestjs/graphql';

@InputType() // inputtype과 field 없으면 타입스크립트로 이용은 가능 , 추가해줘야 graphql에서도 사용가능
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  price: number;
}
