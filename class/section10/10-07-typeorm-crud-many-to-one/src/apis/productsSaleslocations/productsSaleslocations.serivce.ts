import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from './entities/productSaleslocation.entity';
import { IProductsSaleslocationsServiceCreate } from './interfaces/products-saleslocations.interface';

export class ProductsSaleslocationsService {
  constructor(
    @InjectRepository(ProductSaleslocation)
    private readonly productsSaleslocationRepository: Repository<ProductSaleslocation>,
  ) {}

  create({
    productSaleslocation,
  }: IProductsSaleslocationsServiceCreate): Promise<ProductSaleslocation> {
    return this.productsSaleslocationRepository.save({
      ...productSaleslocation,
    });
  }
}
