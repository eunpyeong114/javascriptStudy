import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({}), // 설정도 줄 수 있음
    UsersModule, //UsersModule에서 export해야함
  ],
  providers: [
    AuthResolver, //
    AuthService,
  ],
})
export class AuthModule {}
