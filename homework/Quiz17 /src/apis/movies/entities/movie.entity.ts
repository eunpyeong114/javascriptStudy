import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Actor } from 'src/apis/actors/entities/actor.entity';
import { Director } from 'src/apis/directors/entities/director.entity';
import { Genre } from 'src/apis/genres/entities/genre.entity';
import { Image } from 'src/apis/images/entities/image.entity';
import { TicketingRate } from 'src/apis/ticketingRates/entities/ticketingRate.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Date)
  @Column()
  date: Date;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => String)
  @Column()
  time: string;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 2, scale: 1 })
  grade: number;

  @Field(() => String)
  @Column()
  nation: string;

  @Field(() => String)
  @Column()
  rating: string;

  @Field(() => Boolean)
  @Column({ default: true })
  isRunning: boolean;

  @JoinColumn()
  @OneToOne(() => TicketingRate)
  @Field(() => TicketingRate)
  ticketingRate: TicketingRate;

  @JoinTable()
  @ManyToMany(() => Genre, (genre) => genre.movie)
  @Field(() => [Genre])
  genre: Genre[];

  @JoinTable()
  @ManyToMany(() => Actor, (actor) => actor.movie)
  @Field(() => [Actor])
  actor: Actor[];

  @JoinTable()
  @ManyToMany(() => Director, (director) => director.movie)
  @Field(() => [Director])
  director: Director[];

  @DeleteDateColumn()
  @Field(() => Date)
  deleteAt: Date;
}
