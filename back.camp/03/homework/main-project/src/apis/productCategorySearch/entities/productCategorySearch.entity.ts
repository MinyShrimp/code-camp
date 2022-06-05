/**
 * 상품 카테고리 Entity
 */

import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product_category_search' })
@ObjectType({ description: '검색용 상품 카테고리 Entity' })
export class ProductCategorySearchEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    // 이름
    @Column()
    @Field(() => String, { description: '이름' })
    name: string;

    // 카테고리 1
    @Column({ nullable: false })
    @Field(() => String, { description: '분류 1' })
    c1: string;

    // 카테고리 2
    @Column({ nullable: true })
    @Field(() => String, { description: '분류 2', nullable: true })
    c2?: string;

    // 카테고리 3
    @Column({ nullable: true })
    @Field(() => String, { description: '분류 3', nullable: true })
    c3?: string;

    // 카테고리 4
    @Column({ nullable: true })
    @Field(() => String, { description: '분류 4', nullable: true })
    c4?: string;
}
