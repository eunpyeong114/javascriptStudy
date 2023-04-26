import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppController', () => {
  let appController: AppController; // AppController 타입을 준 것임
  beforeEach(async () => {
    // appService = new AppService();
    // appController = new AppController(appService);

    // test용 모듈을 이용해서 위 의존성 주입 // nestJS 방식
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile(); // compile 모듈 최적화해줘 => 기다려야해서 await 씀

    appController = app.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴해야함!!!', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
