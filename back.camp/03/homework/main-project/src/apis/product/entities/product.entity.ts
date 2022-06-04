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
import { IsUrl, Min } from 'class-validator';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import BookEntity from 'src/apis/book/entities/book.entity';
import ProductTagEntity from 'src/apis/productTag/entities/productTag.entity';
import ProductPriceEntity from 'src/apis/productPrice/entities/productPrice.entity';
import ProductCategorySearchEntity from 'src/apis/productCategorySearch/entities/productCategorySearch.entity';

@Entity({ name: 'product' })
@ObjectType({ description: '상품 Entity' })
export default class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    // 상품 주소
    @Column()
    @IsUrl()
    @Field(
        () => String, //
        { description: '상품 URL' },
    )
    url: string;

    // 재고 갯수
    @Column({ unsigned: true })
    @Min(0)
    @Field(
        () => Int, //
        { description: '재고 개수' },
    )
    stock_count: number;

    // 판매 갯수
    @Column({ default: 0, unsigned: true })
    @Min(0)
    @Field(
        () => Int, //
        { description: '판매 개수' },
    )
    selling_count: number;

    // 생성 시간
    @CreateDateColumn()
    createAt: Date;

    // 업데이트 시간
    @UpdateDateColumn()
    updateAt: Date;

    // 삭제 시간
    @DeleteDateColumn()
    deleteAt: Date;

    // 가격
    // 1:1
    @JoinColumn({ name: 'price_id' })
    @OneToOne(() => ProductPriceEntity, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @Field(() => ProductPriceEntity)
    price: ProductPriceEntity;

    // 책
    // M:1
    @JoinColumn({ name: 'book_id' })
    @ManyToOne(() => BookEntity, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @Field(() => BookEntity)
    book: BookEntity;

    // 상품 카테고리
    // M:1
    @JoinColumn({ name: 'product_category_id' })
    @ManyToOne(() => ProductCategorySearchEntity, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @Field(() => ProductCategorySearchEntity, { nullable: true })
    productCategory: ProductCategorySearchEntity;

    // 상품 태그
    // M:N
    @JoinTable()
    @ManyToMany(() => ProductTagEntity, (productTags) => productTags.products, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @Field(() => [ProductTagEntity])
    productTags: Array<ProductTagEntity>;
}
