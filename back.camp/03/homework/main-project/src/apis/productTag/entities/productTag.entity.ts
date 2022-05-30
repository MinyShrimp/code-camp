/**
 * 상품 태그 Entity
 */

import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import ProductEntity from 'src/apis/product/entities/product.entity';

@Entity({ name: 'product_tag' })
export default class ProductTagEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => ProductEntity, (product) => product.productTags)
    products: Array<ProductEntity>;
}
