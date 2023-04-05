import { Movie } from 'src/apis/movies/entities/movie.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TicketingRate {
  @PrimaryGeneratedColumn()
  number: number;

  @JoinColumn()
  @OneToOne(() => Movie)
  movie: Movie;

  @Column()
  ticketingCount: number;

  @Column({ type: 'decimal', precision: 4, scale: 1 })
  ticketingRating: number;
}
