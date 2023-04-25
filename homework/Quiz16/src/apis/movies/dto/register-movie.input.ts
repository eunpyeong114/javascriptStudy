import { Field, Float, InputType } from '@nestjs/graphql';

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
}
