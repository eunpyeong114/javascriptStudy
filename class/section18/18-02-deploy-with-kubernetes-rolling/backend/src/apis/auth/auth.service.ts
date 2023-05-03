import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceRestoreAccessToken,
  IAuthServiceSetRefreshToken,
} from './interfaces/auth-service.interface';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login({
    email,
    password,
    context,
  }: IAuthServiceLogin): Promise<string> {
    // 1. 이메일이 일치하는 유저를 DB에서 찾기
    const user = await this.userService.findOneByEmail({ email });
    // 2. 일치하는 유저가 없으면 에러 던지기
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다'); //throw는 그자리에서 바로 중단
    // 3. 일치하는 유저가 있지만, 비밀번호가 틀렸다면?
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');
    // 4. refreshToken(=JWT)을 만들어서 브라우저 쿠키에 저장해서 보내주기
    this.setRefreshToken({ user, context });
    // 5. 일치하는 유저도 있고, 비밀번호도 맞았다면?
    //      => accessToken(=JWT)을 만들어서 브라우저에 전달
    return this.getAccessToken({ user });
  }

  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
    return this.getAccessToken({ user });
  }

  setRefreshToken({ user, context }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.id }, //
      { secret: '나의리프레시비밀번호', expiresIn: '2w' },
    );

    // 개발환경
    context.res.setHeader(
      'set-Cookie', // 쿠키에 세팅해놔
      `refreshToken=${refreshToken}; path=/;`, // 이 사항을 세팅해놔 = 브라우저 쿠키에 들어가게 됨
    );

    // 배포환경

    // context.res.setHeader(
    //   'set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`, //domain 백엔드 주소
    // );
    // context.res.setHeader(
    //   'Access-Control-Allow-Origin',
    //   'https://myfrontsite.com',
    // ); // 어디서 허락할 것인지 (프론트엔드 서버)
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id }, //
      { secret: '나의비밀번호', expiresIn: '1h' },
    ); // expiresIn 만료시간
  }
}
