import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE', //자유롭게 정하기 가능
        transport: Transport.TCP,
        options: { host: 'auth-service', port: 3001 }, // maint ts와 똑같이 입력해야 함!!(게이트웨이와 서비스를 똑같이 입력해야함)
      },
      {
        name: 'RESOURCE_SERVICE',
        transport: Transport.TCP,
        options: { host: 'resource-service', port: 3001 }, //(게이트웨이와 서비스를 똑같이 입력해야함)
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
