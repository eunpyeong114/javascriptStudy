import { NestMicroserviceOptions } from '@nestjs/common/interfaces/microservices/nest-microservice-options.interface';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP, // 통신방식
      options: { host: 'resource-service', port: 3001 }, // host명과 port 지정//(게이트웨이와 서비스를 똑같이 입력해야함)
    },
  );
  await app.listen();
}
bootstrap();
