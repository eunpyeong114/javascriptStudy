import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './apis/boards/boards.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './apis/products/products.module';
import { ProductsCategoriesModule } from './apis/productsCategories/productsCategories.module';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
import { PointsTransactionsModule } from './apis/pointsTransactions/pointsTransactions.module';
import { PaymentsMoudle } from './apis/payments/payments.module';

@Module({
  imports: [
    AuthModule,
    BoardsModule,
    PaymentsMoudle,
    PointsTransactionsModule,
    ProductsModule,
    ProductsCategoriesModule,
    UsersModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({
        req, //req는 기본값으로 들어오기 때문에 생략가능! res는 이걸 적어줘야지만 값 받을 수 있음!
        res,
      }),
    }),
    //forRoot 모든 api 전체 적용시켜줘
    TypeOrmModule.forRoot({
      type:
        process.env.DATABASE_TYPE === 'mysql'
          ? process.env.DATABASE_TYPE
          : 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'], // __dirname -> 현재경로, ** -> 그 경로에서 샅샅이 찾아줘
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
