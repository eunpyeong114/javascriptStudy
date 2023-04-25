import { Movie } from 'src/apis/movies/entities/movie.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  url: string;

  @Column()
  isMain: boolean;

  @ManyToOne(() => Movie)
  movie: Movie;
}
