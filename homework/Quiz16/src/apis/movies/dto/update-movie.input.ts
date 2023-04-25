import { InputType, PartialType } from '@nestjs/graphql';
import { RegisterMovieInput } from './register-movie.input';

@InputType()
export class UpdateMovieInput extends PartialType(RegisterMovieInput) {}
