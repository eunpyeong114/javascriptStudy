import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productsSaleslocations/entities/productSaleslocation.entity';
import { ProductsSaleslocationsService } from '../productsSaleslocations/productsSaleslocations.serivce';
import { Product } from './entities/product.entity';
import {
  IProductsServiceCheckSoldout,
  IProductsServiceCreate,
  IProductsServiceDelete,
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

    private readonly productsSaleslocationsService: ProductsSaleslocationsService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productSaleslocation', 'productCategory'],
    }); // find()는 전체찾기 // productSaleslocation은 product entity에서 설정한 변수명
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory'],
    }); //findOne()은 하나 찾기 // productSaleslocation은 product entity에서 설정한 변수명
  }
  // select * from board where name = "마우스"

  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    // 여기서 게시글 등록
    // save는 등록하고 +  등록된 데이터 조회도 해서 옴! => result 변수에 생성된 ID + 등록한 데이터 값을 가지고 있음
    // insert는 등록만 함
    const { productSaleslocation, productCategoryId, ...product } =
      createProductInput;

    const result = await this.productsSaleslocationsService.create({
      productSaleslocation,
    }); // 서비스를 타고 가야 하는 이유는...?
    //  // 레파지토리에 직접 접근하면 검증 로직을 통일 시킬 수 없음!!

    const result2 = this.productsRepository.save({
      ...product,

      // 하나하나 직접 나열하는 방식
      //   name: '마우스', //product.name
      //   description: '좋은 마우스', //product.description
      //   price: 3000, // product.price

      //   객체 없이 result 통째로 넣기 vs 객체내 id만 빼서 넣기 => 브라우저에서 받는 데이터에 차이가 생김
      //    1.
      //   productSaleslocation: {
      //   id: result.id,   // id 값만 받음
      //  },
      //    2.
      productSaleslocation: result, // result 전체 값 다 받음

      //   productSaleslocationId: result.id => 아이디는 자동으로 생성되기 때문에 아래처럼 함
      //   productSaleslocation : {
      //      id:result.id
      //   }

      // d
      productCategory: {
        id: productCategoryId,
        // 만약에, name까지 받고 싶으면?  (2가지 방법)
        // 1. DB에서 카테고리 조회해서 통째로 넣기
        // 2. createProductInput에서 name까지 포함해서 받아오기
      },
    });

    // result 안에는 무엇이 있을까?
    // result = {
    //   id: 'uuid_id',
    //   name: '마우스',
    //   description: '좋은 마우스',
    //   price: 3000,
    // };
    return result2;
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

  async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
    // 1. 실제로 삭제
    // const result = await this.productsRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // 2. 소프트 삭제 - isDeleted (언제 삭제가 되었는지 알 수 없는 불편함 존재) => 직접 구현
    // this.productsRepository.update({ id: productId }, { isDeleted: true });

    // 3. 소프트 삭제 - deletedAt (언제 삭제되었는지도 알 수 있음) => 직접 구현
    // this.productsRepository.update(
    //   { id: productId },
    //   { deletedAt: new Date() },
    // );

    // 4. 소프트 삭제(TypeORM이 제공) - softRemove
    // this.productsRepository.softRemove({ id: productId }); // 단점: id로만 삭제 가능
    //                                                     // 장점: 여러 id 한번에 삭제 가능
    //                                                             => .softRemove([{id:qqq},{id:aaa},{id:zzz}])

    // 5. 소프트 삭제(typeORM이 제공) - softDelete
    const result = await this.productsRepository.softDelete({ id: productId }); // 단점: 여러 id 한번에 삭제 불가능
    //                                                      // 장점: 다른 컬럼으로도 삭제 가능
    return result.affected ? true : false; // 삭제된 것이 있으면 true 없으면 false // affected는 영향 받은 데이터 개수 알려줌
  }
}
