import { Movie } from 'src/apis/movies/entities/movie.entity';
import { RegisterTicketingRateInput } from '../dto/register-ticketingRate.input';

export interface ITicketingRateRegister {
  ticketingRate: RegisterTicketingRateInput;
}

export interface ITicketingRateUpdate {
  prevMovie: Movie;
  ticketingRate: RegisterTicketingRateInput;
}
