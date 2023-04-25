import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Movie } from 'src/apis/movies/entities/movie.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class TicketingRate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field(() => Int)
  ticketingCount: number;

  @Column({ type: 'decimal', precision: 4, scale: 1 })
  @Field(() => Float)
  ticketingRating: number;
}
