import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly clientAuthService: ClientProxy,
    @Inject('RESOURCE_SERVICE')
    private readonly clientResourceService: ClientProxy,
  ) {}

  @Post('/auth/login')
  login(): any {
    // auth-service로 트래픽 넘겨줌
    return this.clientAuthService.send(
      { qqq: '철수' },
      { email: 'a@a.com', password: '1234' },
    ); // 괄호안 첫번째 인자는 같은 인자를 가진 messagePattern으로 감 . 두번째 인자는 data로 들어감
  }

  @Get('/boards')
  fetchBoards(): any {
    // resource-service로 트래픽 넘겨줌
    return this.clientResourceService.send({ cmd: 'fetchBoards' }, {}); // 딱히 데이터 줄 것이 없을 때 빈객체
  }
}
