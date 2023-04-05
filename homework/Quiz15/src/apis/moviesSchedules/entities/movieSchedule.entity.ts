import { MovieRoom } from 'src/apis/movieRooms/entities/movieRoom.entity';
import { Movie } from 'src/apis/movies/entities/movie.entity';
import { Ticketing } from 'src/apis/ticketings/entities/ticketing.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MovieSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  time: string;

  @Column()
  date: Date;

  @Column()
  seatCount: number;

  @ManyToOne(() => Movie)
  movie: Movie;

  @ManyToOne(() => MovieRoom)
  movieRoom: MovieRoom;
}
