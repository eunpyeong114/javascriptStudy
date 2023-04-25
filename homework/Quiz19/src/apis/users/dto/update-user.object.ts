import { Field, ObjectType } from '@nestjs/graphql';
import { Column } from 'typeorm';

@ObjectType()
export class UpdateUserObject {
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
