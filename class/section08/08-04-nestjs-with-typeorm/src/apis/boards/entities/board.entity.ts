import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Board를 하나의테이블로 보고 만들어줌
export class Board {
  @PrimaryGeneratedColumn('increment') // Column으로 봐줌
  number: number;

  @Column()
  writer: string;

  @Column()
  title: string;

  @Column()
  contents: string;
}
