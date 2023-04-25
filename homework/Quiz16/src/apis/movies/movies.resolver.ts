import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegisterMovieInput } from './dto/register-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Resolver()
export class MoviesResolver {
  constructor(
    private readonly moviesService: MoviesService, //
  ) {}
  // 전제 목록 보여주기
  @Query(() => [Movie])
  fetchMovies(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Query(() => Movie)
  fetchMovie(
    @Args('movieId') movieId: string, //
  ): Promise<Movie> {
    return this.moviesService.findOne({ movieId });
  }

  @Mutation(() => Movie)
  registerMovie(
    //데코레이터에선 화살표 함수 적용 안됨
    @Args('registerMovieInput') registerMovieInput: RegisterMovieInput,
  ): Promise<Movie> {
    return this.moviesService.register({ registerMovieInput });
  }
  @Mutation(() => Movie)
  updateMovie(
    @Args('movieId') movieId: string,
    @Args('updateMovieInput') updateMovieInput: UpdateMovieInput,
  ) {
    return this.moviesService.update({ movieId, updateMovieInput });
  }
}
