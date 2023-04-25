import { Field, ObjectType } from '@nestjs/graphql';
import { Movie } from 'src/apis/movies/entities/movie.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Actor {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToMany(() => Movie, (movie) => movie.actor)
  @Field(() => [Movie])
  movie: Movie[];
}
