import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  number: number;
  @Field(() => String)
  @Column()
  writer: string;
  @Field(() => String)
  @Column()
  title: string;
  @Field(() => String)
  @Column()
  contents: string;
}
