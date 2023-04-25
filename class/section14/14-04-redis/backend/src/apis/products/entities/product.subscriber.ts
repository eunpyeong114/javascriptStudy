import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Product } from './product.entity';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface {
  //                  // 실행해줘
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }
  listenTo() {
    // product를 기다릴거야!
    return Product;
  }

  afterInsert(event: InsertEvent<any>): void | Promise<any> {
    // product 테이블에 저장되면 실행해줘
    // event에 저장된 내용이 존재
    console.log(event);

    const id = event.entity.id;
    const name = event.entity.name;
    const description = event.entity.description;
    const price = event.entity.price;
    const isSoldout = event.entity.isSoldout;

    console.log(`${id} ${name} ${description} ${price} ${isSoldout}`); // 구글빅쿼리, AWS 아테나, 엘라스틱서치 등에 담기
    // 1. 트리거는 언제 사용하면 안될까?
    // 트랜잭선으로 연결 된 중오한 내용들

    // 2. 언제 사용하면 좋을까?
    // 메인 로직에 큰 피해를 안끼치는 로직들(통계 계산하기, 로그 쌓아놓기) 뒤쪽에서의 서브 기능
  }
}
