import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  //'access'란 생성된 로그인 방법의 이름을 지어준 것
  constructor() {
    // 인가 처리 -> 실패시 에러 던져줌 / 로직(validate / fetchUser) 실행 안됨
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie; //  refreshToken= dafsadgf
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: '나의리프레시비밀번호', // 암호화할때 생성했던 것 그대로 auth.service.ts
    });
  }

  validate(payload) {
    // 인가 처리 성공시 로직(fetchUser) 처리
    // payload는 sub:id & iat & exp만 들어가 있음
    console.log(payload); // {sub:dfjklsfjd(유저 ID)}
    return {
      id: payload.sub, //req.user = { id:payload.sub} passport에서 user라는 객체를 만들어주는것. 원래는 request안에 user가 없다.
    };
  }
}
