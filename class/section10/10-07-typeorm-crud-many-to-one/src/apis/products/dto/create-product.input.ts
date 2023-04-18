import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductSaleslocationInput } from 'src/apis/productsSaleslocations/dto/product-saleslocation.input';

@InputType() // InputType과 field 없으면 타입스크립트로 이용은 가능 , 추가해줘야 graphql에서도 사용가능
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Min(0) //class-validator를 이용해서 0보다 작은 값은 못들어오게 설정
  @Field(() => Int)
  price: number;

  @Field(() => ProductSaleslocationInput)
  productSaleslocation: ProductSaleslocationInput;

  @Field(() => String)
  productCategoryId: string;
}
