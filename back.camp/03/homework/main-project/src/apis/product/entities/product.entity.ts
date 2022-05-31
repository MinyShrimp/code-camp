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
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import BookEntity from 'src/apis/book/entities/book.entity';
import ProductTagEntity from 'src/apis/productTag/entities/productTag.entity';
import ProductPriceEntity from 'src/apis/productPrice/entities/productPrice.entity';
import ProductCategoryEntity from 'src/apis/productCategory/entities/productCategory.entity';

@ObjectType()
@Entity({ name: 'product' })
export default class ProductEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // 상품 주소
    @Field(() => String)
    @Column()
    url: string;

    // 재고 갯수
    @Field(() => Int)
    @Column()
    stock_count: number;

    // 판매 갯수
    @Field(() => Int)
    @Column()
    selling_count: number;

    // 업데이트 시간
    @Field(() => Date)
    @UpdateDateColumn()
    updateAt: Date;

    // 책
    @Field(() => BookEntity)
    @JoinColumn()
    @ManyToOne(() => BookEntity)
    book: BookEntity;

    // 가격
    @Field(() => ProductPriceEntity)
    @JoinColumn()
    @OneToOne(() => ProductPriceEntity)
    price: ProductPriceEntity;

    // 상품 태그
    @Field(() => [ProductTagEntity])
    @JoinTable()
    @ManyToMany(() => ProductTagEntity, (productTags) => productTags.products)
    productTags: Array<ProductTagEntity>;

    // 상품 카테고리
    @Field(() => ProductCategoryEntity)
    @JoinColumn()
    @ManyToOne(() => ProductCategoryEntity)
    productCategory: ProductCategoryEntity;

    // // 상품 카테고리 0
    // @JoinColumn()
    // @ManyToOne(() => ProductCategory0Entity)
    // productCategory0: ProductCategory0Entity;

    // // 상품 카테고리 1
    // @JoinColumn()
    // @ManyToOne(() => ProductCategory1Entity)
    // productCategory1: ProductCategory1Entity;

    // // 상품 카테고리 2

    // @JoinColumn()
    // @ManyToOne(() => ProductCategory2Entity)
    // productCategory2: ProductCategory2Entity;

    // // 상품 카테고리 3
    // @JoinColumn()
    // @ManyToOne(() => ProductCategory3Entity)
    // productCategory3: ProductCategory3Entity;
}
