import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
} from './interfaces/auth-service.interface';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login({ userId, pwd }: IAuthServiceLogin): Promise<string> {
    // 1. 이메일이 일치하는 유저를 DB에서 찾기
    const user = await this.userService.findOne({ userId });
    // 2. 일치하는 유저가 없으면 에러 던지기
    if (!user) throw new UnprocessableEntityException('아이디가 존재하지 않음');
    // 3. 일치하는 유저가 있지만, 비밀번호가 틀렸다면?
    const isAuth = await bcrypt.compare(pwd, user.pwd);
    if (!isAuth) throw new UnprocessableEntityException('비밀번호 오류');
    // 4. 일치하는 유저도 있고, 비밀번호도 맞았다면?
    //      => accessToken(=JWT)을 만들어서 브라우저에 전달
    return this.getAccessToken({ user });
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id }, //
      { secret: 'CGV암호', expiresIn: '1h' },
    ); // expiresIn 만료시간
  }
}
