import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // javascript는 일꾼(thread)이 한명(single)이라 getHello 실행 후 getHello2를 실행하게 되면, getHello2 처리 속도가 현저히 늦어진다.
  @Get('/qqq') //endpoint위치가 변경됨
  getHello(): string {
    let sum = 0;
    for (let i = 0; i <= 9000000000; i++) {
      sum += 1;
    }
    return '철수 성공!!';
  }

  @Get('/qqq2') //endpoint위치가 변경됨
  getHello2(): string {
    return '영희 성공!!';
  }
}
