import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:3000/login/google', // 다른 주소 적어도 됨
      scope: ['email', 'profile'], //어떤 정보를 받고 싶은지 작성
    });
  }

  // 위 검증 성공시 accessToken / refreshToken / profile 받을 수 있음 // refresh토큰은 안주는 곳 있음
  validate(accessToken, refreshToken, profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

    return {
      name: profile.displayName,
      email: profile.emails[0].value,
      hashedPassword: '1234',
      age: 12,
    };
  }
}
