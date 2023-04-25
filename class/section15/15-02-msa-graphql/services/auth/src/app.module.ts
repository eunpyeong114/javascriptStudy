import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
// import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
  ],
  // controllers: [AppController],
  //graphql 이기 때문에 resolver!
  providers: [
    AppResolver, //
    AppService,
  ],
})
export class AppModule {}