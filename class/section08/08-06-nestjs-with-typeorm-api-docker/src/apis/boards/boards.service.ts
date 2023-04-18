import { Injectable, Scope } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { ICreateBoardInput } from './interfaces/boards-service.interface';
//                  아래의 AppService를
// 인젝션-스코프 => 1. 싱글톤(new 한번만 선언)으로 할래?
//            => 2. Request 스코프(매 요청마다 new 선언)로 할래?
//            => 3. Transient 스코프(매 주입마다 new 선언)로 할래?
@Injectable({ scope: Scope.DEFAULT }) // 기본값 = 싱글톤
export class BoardsService {
  findAll(): Board[] {
    // 1. DB에 접속 후, 데이터를 조회 => 데이터 조회했다고 가정
    // 조회하면 데이터(게시글 번호 /작성자 /제목 /내용)를 '객체'형태 배열에 담겨서 변수로 저장하게 됨
    const result = [
      {
        number: 1,
        writer: '철수',
        title: '제목입니다~',
        contents: '내용이예요!!',
      },
      {
        number: 2,
        writer: '영희',
        title: '영희입니다~',
        contents: '영희이예요!!',
      },
      {
        number: 3,
        writer: '훈이',
        title: '훈이입니다~',
        contents: '훈이이예요!!',
      },
    ];
    // 2. DB에서 꺼내온 결과를 브라우저에 응답(response)주기
    return result;
  }

  create({ createBoardInput }: ICreateBoardInput): string {
    // 1. 브라우저에서 보내준 데이터 확인하기
    console.log(createBoardInput.writer);
    console.log(createBoardInput.title);
    console.log(createBoardInput.contents);
    // 2. DB에 접속 후, 데이터를 저장 => 데이터를 저장했다고 가정

    // 3. DB에 저장된 결과를 브라우저에 응답(response)주기
    return '게시물 등록에 성공하였습니다.';
  }
}
