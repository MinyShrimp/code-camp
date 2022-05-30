/**
 * 상품 Entity
 */

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

import BookEntity from 'src/apis/book/entities/book.entity';
import ProductTagEntity from 'src/apis/productTag/entities/productTag.entity';
import ProductPriceEntity from 'src/apis/productPrice/entities/productPrice.entity';

@Entity({ name: 'product' })
export default class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    url: string;

    @Column()
    stock_count: number;

    @Column()
    selling_count: number;

    @Column()
    updateAt: Date;

    @JoinColumn()
    @ManyToOne(() => BookEntity)
    book: BookEntity;

    @JoinColumn()
    @OneToOne(() => ProductPriceEntity)
    price: ProductPriceEntity;

    @JoinTable()
    @ManyToMany(() => ProductTagEntity, (productTags) => productTags.products)
    productTags: Array<ProductTagEntity>;
}
