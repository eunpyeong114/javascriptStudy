import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProductSalesLocation } from '../productsSalesLocations/entities/productSaleslocation.entity';
import { ProductsSalesLocationsService } from '../productsSalesLocations/productsSalesLocations.service';
import { ProductTagsService } from '../productsTags/productTags.service';
import { Product } from './entities/product.entity';
import {
  IProductServiceCheckSoldout,
  IProductServiceDelete,
  IProductServiceUpdate,
  IProductsServiceCreate,
  IProductsServiceFindOne,
} from './interfaces/products-service.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, //

    private readonly productsSalesLocationsService: ProductsSalesLocationsService,

    private readonly productsTagsService: ProductTagsService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productSalesLocation', 'productCategory', 'productTags'],
    });
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSalesLocation', 'productCategory', 'productTags'],
    });
  }

  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    const {
      productSalesLocationInput,
      productCategoryId,
      productTags,
      ...product
    } = createProductInput;

    // 1-1) 상품거래위치 등록
    const pslResult = await this.productsSalesLocationsService.create({
      productSalesLocationInput,
    }); // 서비스를 타고 가야 하는 이유는... ?
    // // 레파지토리에 직접 접근하면 검증 로직을 통일 시킬 수 없음 !!

    // 1-2) 상품태그 등록
    // productTags가 ['#전자제품', "#영등포", "#컴퓨터"]와 같은 패턴이라고 가정
    const tagNames = productTags.map((el) => el.replace('#', '')); // ["전자제품", "영등포]
    const prevTags = await this.productsTagsService.findByNames({ tagNames });

    const temp = []; // [{name: "영등포"}]
    tagNames.forEach((el) => {
      const isExists = prevTags.find((prevEl) => el === prevEl.name); // prevEl -> 전자제품
      if (!isExists) temp.push({ name: el });
    });

    const newTags = await this.productsTagsService.bulkInsert({ names: temp }); // [{name: 전자제품}, {name: "영등포"}]
    const tags = [...prevTags, ...newTags.identifiers]; // [{id:"전자제품ID"},{id: "영등포ID"}]

    // 1-3) 상품등록
    const pResult = this.productsRepository.save({
      ...product,
      productSalesLocation: pslResult, // result 통째로 넣기 vs id 만 뺴서 넣기
      productCategory: {
        id: productCategoryId,
        // 만약에, name 까지 받고 싶으면?
        // 1. DB에서 카테고리 조회해서 추가하기 통쨰로 넣기
        // 2. createProductInput에서 name까지 포함해서 받아오기
      },
      productTags: tags,
      //   // 하나 하나 직접 나열하는 방식
      //   // name: createProductInput.name
      //   // description: createProductInput.description
      //   // price: createProductInput.price
      //   // productSalesLocation: { id : pslResult.id }
    });

    // // result 안에 무엇이 있을까?
    // // result = {
    // //     id: "qweqwrasdqwrq-asdafasfd",
    // //     name: "마우스",
    // //     description: "좋은 마우스",
    // //     price: 3000
    // // }

    return pResult;
  }

  async update({
    productId,
    updateProductInput,
  }: IProductServiceUpdate): Promise<void> {
    // 기존 있는 내용을 재사용하여, 로직을 통일하자!!
    const product = await this.findOne({ productId });

    // 검증은 서비스에서 하자!!
    this.checkSoldout({ product });

    // this.productsRepository.create() =>  sql 쿼리문이랑 관련 없고 등록을 위해서 객체를 생성해주는 역할
    // this.productsRepository.insert() => 결과를 객체로 못 돌려 받는 등록 방법
    // this.productsRepository.update({조건}, {수정할내용}) =>  결과를 객체로 못 돌려 받는 수정 방법
    // this.productsRepository.save({}) =>  id 미존재시 등록 존재 시 수정 후 결과를 객체로 돌려받음

    // 숙제-1) 왜 아래 에러가 발생하는지 고민해보기
    // 숙제-2) 아래 에러 고쳐보기
    // const result = this.productsRepository.save({
    //   ...product, // 수정 후, 수정 되지 않은 다른 결과값까지 모두 객체로 돌려 받고 싶을 때
    //   ...updateProductInput,
    // });

    // return result;
  }

  // checkSoldout을 함수로 만드는 이유 => 수정시, 삭제시 등 같은 검증 로직 사용
  checkSoldout({ product }: IProductServiceCheckSoldout): void {
    // if (product.isSoldout === true) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY, // => 422
    //   );
    // }

    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    }
  }

  async delete({ productId }: IProductServiceDelete): Promise<boolean> {
    // 1. 실제 삭제
    // const result = await this.productsRepository.delete({ id: productId });
    // return result.affected ? true : false;
    //
    // 2. 소프트 삭제(직접 구현) - isDeleted
    // this.productsRepository.update({ id: productId }, {isDeleted: true});
    //
    // 3. 소프트 삭제(직접 구현) - deletedAt
    // this.productsRepository.update({id : productId}, {deletedAt: new Date()})
    //
    // 4. 소프트 삭제(TypeORM 제공) - softRemove
    // this.productsRepository.softRemove({ id: productId }); // 단점 : id로만 삭제 가능
    //                                                        // 장점 : 여러ID 한번에 지우기 가능
    //                                                        => .softRemove([{id: qqq}, {id: zzz}])

    // 5. 소프트 삭제(TypeORM 제공) - softDelete
    const result = await this.productsRepository.softDelete({ id: productId }); // 단점 : 여러ID 한번에 지우기 불가능
    return result.affected ? true : false; //                                   // 장점 : 다른 컬럼으로도 삭제 가능
  }
}
