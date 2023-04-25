import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  pwd: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  SSN: string;
}
