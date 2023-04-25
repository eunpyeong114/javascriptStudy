import { Field, InputType, Int, OmitType } from '@nestjs/graphql';
import { Column } from 'typeorm';
import { User } from '../entities/user.entity';

@InputType()
export class UpdateUserInput {
  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  phone: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  SSN: string;
}
