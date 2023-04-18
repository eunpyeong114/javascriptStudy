import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductSaleslocation {
  @PrimaryGeneratedColumn('uuid') // 유효아이디
  id: string;

  @Column()
  address: string;

  @Column()
  addressDetail: string;

  @Column({ type: 'decimal', precision: 9, scale: 6 }) // 소수점 6자리 , 총 9자리
  lat: number;

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  lng: number;

  @Column()
  meetingTime: Date;
}
