import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import {
  IProductsServiceCheckSoldout,
  IProductsServiceCreate,
  IProductsServiceFindOne,
  IProductsServiceUpdate,
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

  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    // 기존 있는 내용을 재사용하여, 로직을 통일하자
    // const product = await this.productsRepository.findOne({
    //   where: { id: productId },
    // });

    // 검증은 서비스에서 하자!!
    const product = await this.findOne({ productId });
    this.checkSoldout({ product });

    // 업데이트는 여러 방법이 있음

    // DB 접속이랑 관련 없음. 등록을 위해서 빈 껍데기 객체를 만드는 역할
    // const qqq = this.productsRepository.create();
    // qqq.name = ' ';
    // qqq.price = 3000;
    // // 결과를 객체로 못 돌려받는 등록 방법
    // this.productsRepository.insert(); // 등록하기
    // // 결과를 객체로 못 돌려받는 수정 방법
    // this.productsRepository.update({}, {}); //{조건},{수정할내용}
    // 등록도 되고 수정도 됨/ {}안에 id가 없으면 그냥 등록, 있으면 수정/ 등록된 데이터 조회(객체로 돌려줌)
    const result = this.productsRepository.save({
      // id: productId,
      // isSoldOut: product.isSoldout,
      ...product, // 수정 후 , 수정되지 않은 다른 결과값까지 모두 객체로 돌려받고 싶을 때!
      // name:updateProductInput.name,
      // description:updateProductInput.description,
      // price:updateProductInput.price
      ...updateProductInput,
    });
    return result;
  }

  // checkSoldout을 함수로 만드는 이유 => 수정시, 삭제시 등 같은 검증 로직 사용하기 위해
  checkSoldout({ product }: IProductsServiceCheckSoldout): void {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    }

    // if (product.isSoldout === true) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    // //   ); //프론트엔드 개발자들이 알 수 있게 알려주는 역할
    // }
  }
}
