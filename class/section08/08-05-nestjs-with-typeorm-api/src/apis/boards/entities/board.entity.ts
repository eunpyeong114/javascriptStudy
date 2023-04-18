import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType() // Board를 하나의테이블로 보고 만들어줌
export class Board {
  @PrimaryGeneratedColumn('increment') // Column으로 봐줌
  @Field(() => Int)
  number: number;

  @Column()
  @Field(() => String)
  writer: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  contents: string;
}
