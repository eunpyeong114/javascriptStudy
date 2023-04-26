import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/products/buy') //endpoint위치가 변경됨
  getHello(): string {
    const qqq = 3;
    const profile = {
      age: 13,
      school: '다람쥐초등학교',
    };
    return this.appService.getHello(); //res.send()와 동일 역할 return으로 바로 처리 가능
  }
}
