import { CreateProductInput } from '../dto/create-product.input';

// service 매개변수에 들어가는 인자 타입 만들어 주기 위함 (무엇이 들어가는지 & 오류 방지)
export interface IProductsServiceFindOne {
  productId: string;
}

export interface IProductsServiceCreate {
  createProductInput: CreateProductInput;
}
