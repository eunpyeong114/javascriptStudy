import { MovieRoom } from 'src/apis/movieRooms/entities/movieRoom.entity';
import { Ticketing } from 'src/apis/ticketings/entities/ticketing.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn('uuid')
  number: string;

  @Column()
  name: string;

  @ManyToMany(() => Ticketing, (ticketing) => ticketing.seat)
  ticketing: Ticketing;

  @ManyToOne(() => MovieRoom)
  movieRoom: MovieRoom;
}
