import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productService: ProductsService, //
  ) {}
  // 전제 목록 보여주기
  @Query(() => [Product])
  fetchProducts(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Query(() => [Product])
  fetchProduct(
    @Args('productId') productId: string, //
  ): Promise<Product> {
    return this.productService.findOne({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    //데코레이터에선 화살표 함수 적용 안됨
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    // << 브라우저에 결과 보내주는 2가지 방법>>

    // 1. 등록된 내용이 담긴 객체를 그대로 브라우저에 돌려보내주기
    return this.productService.create({ createProductInput });

    // 2. 결과메세지만 간단히 보내주기
    // return '정상적으로 상품이 등록되었습니다.'
  }
}
