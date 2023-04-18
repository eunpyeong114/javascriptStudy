import { Product } from 'src/apis/products/entities/product.entity';
import { ProductSaleslocation } from 'src/apis/productsSaleslocations/entities/productSaleslocation.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Product, (products) => products.productTags) // 상품이 여러개가 담겨져 오기 때문에 배열에 담기게 해줌
  products: Product[];
}
