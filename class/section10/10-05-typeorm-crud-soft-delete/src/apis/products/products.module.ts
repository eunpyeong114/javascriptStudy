import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, // 외부 모듈을 통해 import해 온 것으로 의존성 주입을 ProductService에 해주기 위한 설정
    ]),
  ],
  providers: [
    ProductsResolver, //
    ProductsService,
  ],
})
export class ProductsModule {}
