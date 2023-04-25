import { Field, Float, InputType } from '@nestjs/graphql';
import { RegisterTicketingRateInput } from 'src/apis/ticketingRates/dto/register-ticketingRate.input';

@InputType()
export class RegisterMovieInput {
  @Field(() => String)
  name: string;

  @Field(() => Date)
  date: Date;

  @Field(() => String)
  description: string;

  @Field(() => String)
  time: string;

  @Field(() => Float)
  grade: number;

  @Field(() => String)
  nation: string;

  @Field(() => String)
  rating: string;

  @Field(() => RegisterTicketingRateInput)
  ticketingRate: RegisterTicketingRateInput;

  @Field(() => [String])
  genre: string[];

  @Field(() => [String])
  actor: string[];

  @Field(() => [String])
  director: string[];
}
