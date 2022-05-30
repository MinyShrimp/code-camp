/**
 * 상품 Entity
 */

import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    OneToOne,
    ManyToOne,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import BookEntity from 'src/apis/book/entities/book.entity';
import ProductTagEntity from 'src/apis/productTag/entities/productTag.entity';
import ProductPriceEntity from 'src/apis/productPrice/entities/productPrice.entity';
import ProductCategory0Entity from 'src/apis/productCategory/entities/productCategory0.entity';
import ProductCategory1Entity from 'src/apis/productCategory/entities/productCategory1.entity';
import ProductCategory2Entity from 'src/apis/productCategory/entities/productCategory2.entity';
import ProductCategory3Entity from 'src/apis/productCategory/entities/productCategory3.entity';

@Entity({ name: 'product' })
export default class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // 상품 주소
    @Column()
    url: string;

    // 재고 갯수
    @Column()
    stock_count: number;

    // 판매 갯수
    @Column()
    selling_count: number;

    // 업데이트 시간
    @UpdateDateColumn()
    updateAt: Date;

    // 책
    @JoinColumn()
    @ManyToOne(() => BookEntity)
    book: BookEntity;

    // 가격
    @JoinColumn()
    @OneToOne(() => ProductPriceEntity)
    price: ProductPriceEntity;

    // 상품 태그
    @JoinTable()
    @ManyToMany(() => ProductTagEntity, (productTags) => productTags.products)
    productTags: Array<ProductTagEntity>;

    // 상품 카테고리 0
    @JoinColumn()
    @ManyToOne(() => ProductCategory0Entity)
    productCategory0: ProductCategory0Entity;

    // 상품 카테고리 1
    @JoinColumn()
    @ManyToOne(() => ProductCategory1Entity)
    productCategory1: ProductCategory1Entity;

    // 상품 카테고리 2
    @JoinColumn()
    @ManyToOne(() => ProductCategory2Entity)
    productCategory2: ProductCategory2Entity;

    // 상품 카테고리 3
    @JoinColumn()
    @ManyToOne(() => ProductCategory3Entity)
    productCategory3: ProductCategory3Entity;
}
