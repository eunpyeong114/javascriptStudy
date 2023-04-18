// updateProduct()에서 변경될 값 받기 위한 데이터 타입 설정

import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  // 아래 내용들을 상속 받음
  //   Field(()=>String)
  //   name?: string; // ?를 넣어줌으로써 선택사항으로 만들어주기
  //   Field(()=>String)
  //   description?: string;
  //   Field(()=>String)
  //   price?: number;
}

// PickType(CreateProductInput,["name","price"])  => typescript의 pick 타입
// OmitType(CreateProductInput,["description"])  =>  omit
// PartialType(CreateProductInput)  => partial
