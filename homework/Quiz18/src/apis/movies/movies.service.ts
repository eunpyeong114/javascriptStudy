import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ActorService } from '../actors/actor.service';
import { DirectorService } from '../directors/director.service';
import { GenreService } from '../genres/genre.service';
import { TicketingRate } from '../ticketingRates/entities/ticketingRate.entity';
import { TicketingRateService } from '../ticketingRates/ticketingRate.service';
import { Movie } from './entities/movie.entity';
import {
  IMovieServiceCheck,
  IMovieServiceRestore,
  IMovieServiceSoftDelete,
  IMovieServiceUpdate,
  IMoviesServiceFindOne,
  IMoviesServiceRegister,
} from './interface/movie-service.interface';

@Injectable() // 의존성 주입
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>, //

    private readonly ticketingRateService: TicketingRateService,

    private readonly genreService: GenreService,

    private readonly actorService: ActorService,

    private readonly directorService: DirectorService,
  ) {}

  findAll(): Promise<Movie[]> {
    return this.moviesRepository.find({
      relations: ['ticketingRate', 'genre', 'actor', 'director'],
    });
  }

  findOne({ movieId }: IMoviesServiceFindOne): Promise<Movie> {
    return this.moviesRepository.findOne({
      where: { id: movieId },
      relations: ['ticketingRate', 'genre', 'actor', 'director'],
    });
  }
  findWithDeleted(): Promise<Movie[]> {
    return this.moviesRepository.find({
      withDeleted: true,
      relations: ['ticketingRate', 'genre', 'actor', 'director'],
    });
  }

  async register({
    registerMovieInput,
  }: IMoviesServiceRegister): Promise<Movie> {
    const { ticketingRate, genre, actor, director, ...movie } =
      registerMovieInput;
    // 1. 예매율 등록
    const rateResult = await this.ticketingRateService.register({
      ticketingRate,
    });
    // 2. 장르 등록
    const prevGenre = await this.genreService.findByNames({ genre });
    const tempGenre = [];
    genre.forEach((el) => {
      const isExists = prevGenre.find((prevEl) => el === prevEl.name);
      if (!isExists) tempGenre.push({ name: el });
    });
    const newGenre = await this.genreService.bulkInsert({ tempGenre });
    const genres = [...prevGenre, ...newGenre.identifiers];

    // 3. 배우 등록
    const prevActor = await this.actorService.findByNames({ actor });
    const tempActor = [];
    actor.forEach((el) => {
      const isExists = prevActor.find((prevEl) => el === prevEl.name);
      if (!isExists) tempActor.push({ name: el });
    });
    const newActor = await this.actorService.bulkInsert({ tempActor });
    const actors = [...prevActor, ...newActor.identifiers];

    // 4. 감독 등록
    const prevDirector = await this.directorService.findByNames({ director });
    console.log(prevDirector);
    const tempDirector = [];
    director.forEach((el) => {
      const isExists = prevDirector.find((prevEl) => el === prevEl.name);
      if (!isExists) tempDirector.push({ name: el });
    });

    const newDirector = await this.directorService.bulkInsert({ tempDirector });
    const directors = [...prevDirector, ...newDirector.identifiers];
    // 5. 영화 등록
    const result = this.moviesRepository.save({
      ...movie,
      ticketingRate: rateResult,
      genre: genres,
      actor: actors,
      director: directors,
    });

    return result;
  }

  async update({
    movieId,
    updateMovieInput,
  }: IMovieServiceUpdate): Promise<Movie> {
    const { ticketingRate, genre, actor, director, ...movie } =
      updateMovieInput;
    const prevMovie = await this.findOne({ movieId });
    this.checkIsRunning({ prevMovie });

    // 1. 예매율 업데이트
    const updateTicketingRate = await this.ticketingRateService.update({
      prevMovie,
      ticketingRate,
    });

    // 2. 장르 업데이트
    const prevGenre = await this.genreService.findByNames({ genre });
    console.log('********', prevGenre);
    const tempGenre = [];
    genre.forEach((el) => {
      const isExists = prevGenre.find((prevEl) => el === prevEl.name);
      if (!isExists) tempGenre.push({ name: el });
    });
    const newGenre = await this.genreService.bulkInsert({ tempGenre });
    const genres = [...prevGenre, ...newGenre.identifiers];

    // 3. 배우 업데이트
    const prevActor = await this.actorService.findByNames({ actor });
    const tempActor = [];
    actor.forEach((el) => {
      const isExists = prevActor.find((prevEl) => el === prevEl.name);
      if (!isExists) tempActor.push({ name: el });
    });
    const newActor = await this.actorService.bulkInsert({ tempActor });
    const actors = [...prevActor, ...newActor.identifiers];
    // 4. 감독 업데이트
    const prevDirector = await this.directorService.findByNames({ director });
    console.log(prevDirector);
    const tempDirector = [];
    director.forEach((el) => {
      const isExists = prevDirector.find((prevEl) => el === prevEl.name);
      if (!isExists) tempDirector.push({ name: el });
    });

    const newDirector = await this.directorService.bulkInsert({ tempDirector });
    const directors = [...prevDirector, ...newDirector.identifiers];
    // 5. 영화 업데이트
    const result = this.moviesRepository.save({
      ...prevMovie,
      ...movie,
      updateTicketingRate,
      genre: genres,
      actor: actors,
      director: directors,
    });
    return result;
  }

  async softDeleteMovie({
    movieId,
  }: IMovieServiceSoftDelete): Promise<boolean> {
    const result = await this.moviesRepository.softDelete({ id: movieId });
    return result.affected ? true : false;
  }

  async restoreMovie({ movieId }: IMovieServiceRestore): Promise<boolean> {
    const result = await this.moviesRepository.restore({ id: movieId });
    return result.affected ? true : false;
  }

  checkIsRunning({ prevMovie }: IMovieServiceCheck): void {
    if (!prevMovie.isRunning) {
      throw new UnprocessableEntityException('이미 상영이 끝난 영화입니다.');
    }
  }
}
