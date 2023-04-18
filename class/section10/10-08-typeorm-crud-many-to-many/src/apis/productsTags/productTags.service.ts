import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, InsertResult, Repository } from 'typeorm';
import { ProductTag } from './entities/productTag.entity';
import {
  IProductsTagsServiceFindByNames,
  IProductTagsServiceBulkInsert,
} from './interfaces/products-tags-service.interface';

@Injectable()
export class ProductsTagsService {
  constructor(
    @InjectRepository(ProductTag)
    private readonly productsTagsRepository: Repository<ProductTag>,
  ) {}

  findByNames({
    tagNames,
  }: IProductsTagsServiceFindByNames): Promise<ProductTag[]> {
    return this.productsTagsRepository.find({
      where: { name: In(tagNames) },
    });
  }

  bulkInsert({ names }: IProductTagsServiceBulkInsert): Promise<InsertResult> {
    return this.productsTagsRepository.insert(names);
  }
}
