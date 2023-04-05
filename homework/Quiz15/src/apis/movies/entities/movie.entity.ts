import { Actor } from 'src/apis/actors/entities/actor.entity';
import { Director } from 'src/apis/directors/entities/director.entity';
import { Genre } from 'src/apis/genres/entities/genre.entity';
import { Image } from 'src/apis/images/entities/image.entity';
import { TicketingRate } from 'src/apis/ticketingRates/entities/ticketingRate.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column()
  time: string;

  @Column({ type: 'decimal', precision: 2, scale: 2 })
  grade: number;

  @Column()
  nation: string;

  @Column()
  rating: string;

  @Column({ default: true })
  isRunning: boolean;

  @JoinTable()
  @ManyToMany(() => Genre, (genre) => genre.movie)
  genre: Genre[];

  @JoinTable()
  @ManyToMany(() => Actor, (actor) => actor.movie)
  actor: Actor[];

  @JoinTable()
  @ManyToMany(() => Director, (director) => director.movie)
  director: Director[];
}
