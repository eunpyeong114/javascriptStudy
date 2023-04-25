import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { MoviesResolver } from './movies.resolver';
import { MoviesService } from './movies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Movie, // 외부 모듈을 통해 import해 온 것으로 의존성 주입을 ProductService에 해주기 위한 설정
    ]),
  ],
  providers: [
    MoviesResolver, //
    MoviesService,
  ],
})
export class MoviesModule {}
