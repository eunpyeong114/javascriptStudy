import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'qqq', url: 'http://auth-service:3001/graphql' }, //이름은 중요하지 않고, 주소가 더 중요! graphql 엔드포인트(도커 네임레졸류션)
            { name: 'zzz', url: 'http://resource-service:3002/graphql' },
          ],
        }), // 얘네들 조립해주겠다
      }, // 누구를 연결할 것인가에 대한 내용
    }),
  ],
  // controllers: [AppController], //resolver,service 하는 역할 없음! gateway가 서비스 조립해주는 역할만 함
  // providers: [AppService],
})
export class AppModule {}
