import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSaleslocation } from '../productsSaleslocations/entities/productSaleslocation.entity';
import { ProductsSaleslocationsService } from '../productsSaleslocations/productsSaleslocations.serivce';
import { ProductTag } from '../productsTags/entities/productTag.entity';
import { ProductsTagsService } from '../productsTags/productTags.service';
import { Product } from './entities/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, // 외부 모듈을 통해 import해 온 것으로 의존성 주입을 ProductService에 해주기 위한 설정
      ProductSaleslocation, // 좋은 방법 아님 => 나중에 모듈로 합쳐서 한번에 가져오자!!
      ProductTag, // 좋은 방법 아님 => 나중에 모듈로 합쳐서 한번에 가져오자!!
    ]),
  ],
  providers: [
    ProductsResolver, //
    ProductsService,
    ProductsSaleslocationsService, // 좋은 방법 아님 => 나중에 모듈로 합쳐서 한번에 가져오자!!
    ProductsTagsService, // 좋은 방법 아님 => 나중에 모듈로 합쳐서 한번에 가져오자!!
  ],
})
export class ProductsModule {}
