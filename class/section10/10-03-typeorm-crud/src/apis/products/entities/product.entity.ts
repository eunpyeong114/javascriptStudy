import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productsSaleslocations/entities/productSaleslocation.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid') // 자동 생성
  @Field(() => String)
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => Int)
  @Column()
  price: number;

  @Field(() => Boolean)
  @Column({ default: false })
  isSoldout: boolean;

  @JoinColumn() // 테이블을 연결하는 컬럼 // onetoone에서만 필요한 컬럼 // 연결하려는 테이블 한쪽에서만 작성해야함 (방향이 바뀔수가 있기 때문에 연결의 주체를 선정하는 느낌)
  @OneToOne(() => ProductSaleslocation) // ProductSaleslocation에 1:1로 연결할거야! to를 기준으로 앞의 one은 Product 뒤의 one은 ProductSaleslocation
  @Field(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;

  @ManyToOne(() => ProductCategory) // many가 항상 one을 따라다님! 그렇기에 joincolumn 필요 없음
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinTable() // 중간테이블 자동 생성됨 // 이건 두 entity중 아무데나 해주면 됨
  @ManyToMany(() => ProductTag, (productTags) => productTags.products) // , 뒤에는 상품태그 입장에서 상품을 어떻게 보고 있는지 // 이건 producttag entity에서 설정해 준 이름 => 이렇게 해야 상호간 연결이 된다!
  @Field(() => [ProductTag])
  productTags: ProductTag[]; // 상품에 상품태그가 여러개 담겨오기 때문에 배열에 담기게 해줌
}
