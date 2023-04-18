import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductSalesLocationInput } from 'src/apis/productsSalesLocations/dto/product-saleslocation.input';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  // 0보다 작은 값은 들어올수 없음
  @Min(0)
  @Field(() => Int)
  price: number;

  @Field(() => ProductSalesLocationInput)
  productSalesLocationInput: ProductSalesLocationInput;

  @Field(() => String)
  productCategoryId: string;

  @Field(() => [String])
  productTags: string[];
}
