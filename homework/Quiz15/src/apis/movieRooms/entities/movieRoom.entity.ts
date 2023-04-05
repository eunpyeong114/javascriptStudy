import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MovieRoom {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  seatCount: number;
}
