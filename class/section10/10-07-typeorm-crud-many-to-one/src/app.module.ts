import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './apis/boards/boards.module';
import { Board } from './apis/boards/entities/board.entity';
import { ConfigModule } from '@nestjs/config';
import { Product } from './apis/products/entities/product.entity';
import { ProductSaleslocation } from './apis/productsSaleslocations/entities/productSaleslocation.entity';
import { ProductsModule } from './apis/products/products.module';
import { ProductsCategoriesModule } from './apis/productsCategories/productsCategories.module';

@Module({
  imports: [
    BoardsModule,
    ProductsModule,
    ProductsCategoriesModule,
    // UsersModule
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type:
        process.env.DATABASE_TYPE === 'mysql'
          ? process.env.DATABASE_TYPE
          : 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      //entities: [Board, Product, ProductSaleslocation], // 데이터베이스에 해당 테이블 만들어짐
      entities: [__dirname + '/apis/**/*.entity.*'], // dirname 현재 위치 / ** apis의 모든 폴더 내부까지 / 마지막에 .js로 하던지 *로 하던지 하면 됨 why? 실제로 실행될 때는 ts가 아니라 js로 실행되기 때문에

      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
