/* Product Entity */

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
    DeleteDateColumn,
    CreateDateColumn,
} from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import BookEntity from 'src/apis/book/entities/book.entity';
import ProductTagEntity from 'src/apis/productTag/entities/productTag.entity';
import ProductPriceEntity from 'src/apis/productPrice/entities/productPrice.entity';
import ProductCategorySearchEntity from 'src/apis/productCategorySearch/entities/productCategorySearch.entity';

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
    @Column({ unsigned: true })
    stock_count: number;

    // 판매 갯수
    @Field(() => Int)
    @Column({ default: 0, unsigned: true })
    selling_count: number;

    // 생성 시간
    @Field(() => Date)
    @CreateDateColumn()
    createAt: Date;

    // 업데이트 시간
    @Field(() => Date)
    @UpdateDateColumn()
    updateAt: Date;

    // 삭제 시간
    @Field(() => Date, { nullable: true })
    @DeleteDateColumn()
    deleteAt: Date;

    // 가격
    // 1:1
    @Field(() => ProductPriceEntity)
    @JoinColumn({ name: 'price_id' })
    @OneToOne(() => ProductPriceEntity, {
        cascade: true, //
        onDelete: 'CASCADE',
    })
    price: ProductPriceEntity;

    // 책
    // M:1
    @Field(() => BookEntity)
    @JoinColumn({ name: 'book_id' })
    @ManyToOne(() => BookEntity, {
        cascade: false, //
        onDelete: 'NO ACTION',
    })
    book: BookEntity;

    // 상품 카테고리
    // M:1
    @Field(() => ProductCategorySearchEntity, { nullable: true })
    @JoinColumn({ name: 'product_category_id' })
    @ManyToOne(() => ProductCategorySearchEntity, {
        cascade: false,
        onDelete: 'NO ACTION',
    })
    productCategory: ProductCategorySearchEntity;

    // 상품 태그
    // M:N
    @Field(() => [ProductTagEntity])
    @JoinTable()
    @ManyToMany(() => ProductTagEntity, (productTags) => productTags.products)
    productTags: Array<ProductTagEntity>;
}
