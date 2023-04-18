import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSalesLocation } from '../productsSalesLocations/entities/productSaleslocation.entity';
import { ProductsSalesLocationsService } from '../productsSalesLocations/productsSalesLocations.service';
import { ProductTag } from '../productsTags/entities/productTag.entity';
import { ProductTagsService } from '../productsTags/productTags.service';
import { Product } from './entities/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSalesLocation, // 좋은 방법 아님 => 나중에 모듈로 합쳐서 한번에 가져오자!!
      ProductTag, // 좋은 방법 아님 => 나중에 모듈로 합쳐서 한번에 가져오자!!
    ]),
  ],
  providers: [
    ProductsResolver, //
    ProductsService,
    ProductsSalesLocationsService, // 좋은 방법 아님 => 나중에 모듈로 합쳐서 한번에 가져오자!!
    ProductTagsService, // 좋은 방법 아님 => 나중에 모듈로 합쳐서 한번에 가져오자!!
  ],
})
export class ProductsModule {}
