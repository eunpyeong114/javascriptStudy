import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  // @Field(() => String) // 비밀번호는 DB에서 꺼내서 브라우저에 전달하지 않음
  password: string;

  @Column()
  @Field(() => Int)
  age: number;
}
