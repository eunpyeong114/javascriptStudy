import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appService: AppService; // AppService타입을 준 것임
  let appController: AppController; // AppController 타입을 준 것임
  beforeEach(() => {
    // 직접 의존성 주입(옛날 방식)
    appService = new AppService();
    appController = new AppController(appService);
  });

  describe('getHello', () => {
    it('이 테스트의 검증 결과는 Hello World를 리턴해야함!!!', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  // beforeEach()를 통해 코드를 간단하게 줄일 수 있다
  //   describe('fetchBoards', () => {
  //     const appService = new AppService();
  //     const appController = new AppController(appService);
  //     expect(appController.fetchBoards()).toBe();
  //   });

  //   describe('createBoards', () => {
  //     const appService = new AppService();
  //     const appController = new AppController(appService);
  //     expect(appController.createBoards()).toBe();
  //   });
});
