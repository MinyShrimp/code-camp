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
    BaseEntity,
} from 'typeorm';
import { IsUrl, Min } from 'class-validator';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { BookEntity } from '../../book/entities/book.entity';
import { ProductTagEntity } from '../../productTag/entities/productTag.entity';
import { ProductCategorySearchEntity } from '../../productCategorySearch/entities/productCategorySearch.entity';

@Entity({ name: 'product' })
@ObjectType({ description: '상품 Entity' })
export class ProductEntity extends BaseEntity {
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

    @Column({ unsigned: true })
    @Min(0)
    @Field(
        () => Int, //
        { description: '가격' },
    )
    price: number;

    // 생성 시간
    @CreateDateColumn()
    createAt: Date;

    // 업데이트 시간
    @UpdateDateColumn()
    updateAt: Date;

    // 삭제 시간
    @DeleteDateColumn()
    deleteAt: Date;

    // 책
    // M:1
    @JoinColumn({ name: 'bookId' })
    @ManyToOne(() => BookEntity, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @Field(() => BookEntity)
    book: BookEntity;

    @Column({ name: 'bookId', type: 'uuid' })
    bookId: string;

    // 상품 카테고리
    // M:1
    @JoinColumn({ name: 'productCategoryId' })
    @ManyToOne(() => ProductCategorySearchEntity, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    @Field(() => ProductCategorySearchEntity, { nullable: true })
    productCategory: ProductCategorySearchEntity;

    @Column({ name: 'productCategoryId', type: 'uuid' })
    productCategoryId: string;

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
