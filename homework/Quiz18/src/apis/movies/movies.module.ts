import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorService } from '../actors/actor.service';
import { Actor } from '../actors/entities/actor.entity';
import { DirectorService } from '../directors/director.service';
import { Director } from '../directors/entities/director.entity';
import { Genre } from '../genres/entities/genre.entity';
import { GenreService } from '../genres/genre.service';
import { TicketingRate } from '../ticketingRates/entities/ticketingRate.entity';
import { TicketingRateService } from '../ticketingRates/ticketingRate.service';
import { Movie } from './entities/movie.entity';
import { MoviesResolver } from './movies.resolver';
import { MoviesService } from './movies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Movie, // 외부 모듈을 통해 import해 온 것으로 의존성 주입을 ProductService에 해주기 위한 설정
      TicketingRate,
      Genre,
      Actor,
      Director,
    ]),
  ],
  providers: [
    MoviesResolver, //
    MoviesService,
    TicketingRateService,
    GenreService,
    ActorService,
    DirectorService,
  ],
})
export class MoviesModule {}
