import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  // constructor(private readonly appService) {}

  @MessagePattern({ qqq: '철수' })
  login222(data) {
    // 로그인 진행(서비스 타고 갔다오기)
    console.log(data);
    return 'accessToken!!';
  }

  logout() {
    // 로그아웃 진행(서비스 타고 갔다오기)
  }

  restoreAccessToken() {
    // 토큰 재발급 진행(서비스 타고 갔다오기)
  }
}
