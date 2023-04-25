import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import {
  IMovieServiceCheck,
  IMovieServiceUpdate,
  IMoviesServiceFindOne,
  IMoviesServiceRegister,
} from './interface/movie-service.interface';

@Injectable() // 의존성 주입
export class MoviesService {
  constructor(
    // DB에서 데이터 조회 /저장하기 위함
    // product 레퍼지토리야~ 라는 의미
    @InjectRepository(Movie) // typeorm에서 제공되는 의존성 주입 기능
    private readonly moviesRepository: Repository<Movie>, //
  ) {}

  findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  findOne({ movieId }: IMoviesServiceFindOne): Promise<Movie> {
    return this.moviesRepository.findOne({ where: { id: movieId } });
  }

  register({ registerMovieInput }: IMoviesServiceRegister): Promise<Movie> {
    const result = this.moviesRepository.save({
      ...registerMovieInput,
    });

    return result;
  }

  async update({
    movieId,
    updateMovieInput,
  }: IMovieServiceUpdate): Promise<Movie> {
    // 기존 있는 내용을 재사용하여, 로직을 통일하자
    // const product = await this.productsRepository.findOne({
    //   where: { id: productId },
    // });

    // 검증은 서비스에서 하자!!
    const movie = await this.findOne({ movieId });
    this.checkIsRunning({ movie });

    // 업데이트는 여러 방법이 있음

    // DB 접속이랑 관련 없음. 등록을 위해서 빈 껍데기 객체를 만드는 역할
    // const qqq = this.productsRepository.create();
    // qqq.name = ' ';
    // qqq.price = 3000;
    // // 결과를 객체로 못 돌려받는 등록 방법
    // this.productsRepository.insert(); // 등록하기
    // // 결과를 객체로 못 돌려받는 수정 방법
    // this.productsRepository.update({}, {}); //{조건},{수정할내용}
    // 등록도 되고 수정도 됨/ {}안에 id가 없으면 그냥 등록, 있으면 수정/ 등록된 데이터 조회(객체로 돌려줌)
    const result = this.moviesRepository.save({
      ...movie, // 수정 후 , 수정되지 않은 다른 결과값까지 모두 객체로 돌려받고 싶을 때!
      ...updateMovieInput,
    });
    return result;
  }

  checkIsRunning({ movie }: IMovieServiceCheck): void {
    if (!movie.isRunning) {
      throw new UnprocessableEntityException('이미 상영이 끝난 영화입니다.');
    }
  }
}
