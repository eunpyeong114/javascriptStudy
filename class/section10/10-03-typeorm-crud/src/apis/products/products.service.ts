import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import {
  IProductsServiceCreate,
  IProductsServiceFindOne,
} from './interfaces/products-service.interface';

@Injectable() // 의존성 주입
export class ProductsService {
  constructor(
    // DB에서 데이터 조회 /저장하기 위함
    // product 레퍼지토리야~ 라는 의미
    @InjectRepository(Product) // typeorm에서 제공되는 의존성 주입 기능
    private readonly productsRepository: Repository<Product>, //
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find(); // find()는 전체찾기
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({ where: { id: productId } }); //findOne()은 하나 찾기
  }
  // select * from board where name = "마우스"

  create({ createProductInput }: IProductsServiceCreate): Promise<Product> {
    // 여기서 게시글 등록
    // save는 등록하고 +  등록된 데이터 조회도 해서 옴! => result 변수에 생성된 ID + 등록한 데이터 값을 가지고 있음
    // insert는 등록만 함
    const result = this.productsRepository.save({
      ...createProductInput,

      // 하나하나 직접 나열하는 방식
      //   name: '마우스', //createProductInput.name
      //   description: '좋은 마우스', //createProductInput.description
      //   price: 3000, // createProductInput.price
    });

    // result 안에는 무엇이 있을까?
    // result = {
    //   id: 'uuid_id',
    //   name: '마우스',
    //   description: '좋은 마우스',
    //   price: 3000,
    // };
    return result;
  }
}
