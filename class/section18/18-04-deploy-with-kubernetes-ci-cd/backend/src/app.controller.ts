import { Get, Controller } from '@nestjs/common';
@Controller()
export class AppController {
  // health checker 설정하기 위해 생성 => app.module.ts 에 controller 추가해줌
  @Get('/')
  getHello() {
    return '안녕~';
  }
}
