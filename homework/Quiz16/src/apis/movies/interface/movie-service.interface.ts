import { RegisterMovieInput } from '../dto/register-movie.input';
import { UpdateMovieInput } from '../dto/update-movie.input';
import { Movie } from '../entities/movie.entity';

export interface IMoviesServiceFindOne {
  movieId: string;
}

export interface IMoviesServiceRegister {
  registerMovieInput: RegisterMovieInput;
}

export interface IMovieServiceUpdate {
  movieId: string;
  updateMovieInput: UpdateMovieInput;
}

export interface IMovieServiceCheck {
  movie: Movie;
}
