import { Injectable, Scope } from '@nestjs/common';
//                  아래의 AppService를
// 인젝션-스코프 => 1. 싱글톤(new 한번만 선언)으로 할래?
//            => 2. Request 스코프(매 요청마다 new 선언)로 할래?
//            => 3. Transient 스코프(매 주입마다 new 선언)로 할래?
@Injectable({ scope: Scope.DEFAULT }) // 기본값 = 싱글톤
export class BoardsService {
  qqq(): string {
    return 'Hello World!';
  }
}
