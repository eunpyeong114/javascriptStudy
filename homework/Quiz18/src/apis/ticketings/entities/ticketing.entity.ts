import { MutationTypeFactory } from '@nestjs/graphql/dist/schema-builder/factories/mutation-type.factory';
import { MovieSchedule } from 'src/apis/moviesSchedules/entities/movieSchedule.entity';
import { Seat } from 'src/apis/seats/entities/seat.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Ticketing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  count: number;

  @Column()
  money: number;

  @Column()
  method: string;

  @Column()
  date: Date;

  @ManyToOne(() => User)
  user: User;

  @JoinTable()
  @ManyToMany(() => Seat, (seat) => seat.ticketing)
  seat: Seat[];

  @ManyToOne(() => MovieSchedule)
  movieSchedule: MovieSchedule;
}
