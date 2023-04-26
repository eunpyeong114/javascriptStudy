import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createCipheriv } from 'crypto';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

// 나만의 가짜(Mocking)데이터베이스 만들기
class MockUsersRepository {
  mydb = [
    // user 테이블이다
    { email: 'a@a.com', password: '0000', name: '짱구', age: 8 },
    { email: 'qqq@qqq.com', password: '1234', name: '철수', age: 12 },
  ];

  // mini typescipt 작성(findOne,save)
  findOne({ where }) {
    const users = this.mydb.filter((el) => el.email === where.email);
    if (users.length) return users[0];
    return null; // 못찾았으면 null(typeorm과 동일하게 처리해준 것)
  }

  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });
    return { email, password, name, age };
  }
}

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const usersModule = await Test.createTestingModule({
      //   imports: [
      //     TypeOrmModule...
      //   ],
      //   controllers: [],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User), // ()안의 내용이 들어가 있는 @InjectRepository의 repository 자리에 내가 만든 가짜를 넣어 대신 사용하겠다
          useClass: MockUsersRepository,
        },
      ],
    }).compile();

    usersService = usersModule.get<UsersService>(UsersService);
  });

  //   describe('findOneByEmail', () => {
  //     const result = usersService.findOneByEmail({ email: 'a@a.com' });
  //     expect(result).toStrickEqual({ // 객체/배열은 메모리주소값으로 비교하기 때문에 toBe로 판단할 수 없음! 무조건 false나오기 때문에 다른 매서드 사용해서 테스트하기
  //       email: 'a@a.com',
  //       name: '짱구',
  //     });
  //   });

  describe('create', () => {
    it('이미 존재하는 이메일 검증하기!!', async () => {
      const myData = {
        email: 'a@a.com', // DB에 이미 있는 이메일
        password: '1234',
        name: '철수',
        age: 13,
      };
      try {
        await usersService.create({ ...myData });
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException); // toBeInstanceOf = (해당)자식이냐? 라는 의미
      }
    });

    it('회원 등록 잘 됐는지 검증!!', async () => {
      const myData = {
        email: 'bbb@bbb.com', // DB에 없는 이메일
        password: '1234',
        name: '철수',
        age: 13,
      };

      const result = await usersService.create({ ...myData });
      const { password, ...rest } = result; // result 값 내 password 제외하고 결과값 받기 위해(안전한 방법/password 데이터 보존하면서)
      //   delete result.password; // result 값 내 password 지우기
      expect(rest).toStrictEqual({
        email: 'bbb@bbb.com',
        name: '철수',
        age: 13,
      });
    });

    // TDD 예시(기능은 없지만 테스트 코드 먼저 만들어 놓고 후에 기능 구현)
    // TDD => 테스트를 먼저 만들자!! 필수는 아니지만, 기업 문화의 일종
    it('이메일 길이가 초과됐을때 검증!!!', async () => {
      const myData = {
        email: 'sdafsdsfdsfdsafdsfdsafsd', // DB에 없는 이메일
        password: '1234',
        name: '철수',
        age: 13,
      };
      try {
        await usersService.create({ ...myData });
      } catch (error) {
        expect(error).toBeInstanceOf(UnprocessableEntityException);
      }
    });
  });
});
