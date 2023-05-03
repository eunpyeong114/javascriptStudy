import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSalesLocation } from './entities/productSalesLocation.entity';
import { IProductsSalesLocationsServiceCreate } from './interfaces/products-saleslocations.interface';

export class ProductsSalesLocationsService {
  constructor(
    @InjectRepository(ProductSalesLocation)
    private readonly productsSalesLocationRepository: Repository<ProductSalesLocation>, //
  ) {}

  create({
    productSalesLocationInput,
  }: IProductsSalesLocationsServiceCreate): Promise<ProductSalesLocation> {
    return this.productsSalesLocationRepository.save({
      ...productSalesLocationInput,
    });
  }
}
