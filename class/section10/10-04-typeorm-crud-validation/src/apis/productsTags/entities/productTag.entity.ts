import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { ProductSaleslocation } from 'src/apis/productsSaleslocations/entities/productSaleslocation.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductTag {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToMany(() => Product, (products) => products.productTags) // 상품이 여러개가 담겨져 오기 때문에 배열에 담기게 해줌
  @Field(() => [Product])
  products: Product[];
}
