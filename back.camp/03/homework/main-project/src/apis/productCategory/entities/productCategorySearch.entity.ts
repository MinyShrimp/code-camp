/**
 * 상품 카테고리 Entity
 */

import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'product_category_search' })
export default class ProductCategorySearchEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // 이름
    @Field(() => String)
    @Column()
    name: string;

    // 카테고리 1
    @Field(() => String, { nullable: false })
    @Column({ nullable: false })
    c1: string;

    // 카테고리 2
    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    c2?: string;

    // 카테고리 3
    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    c3?: string;

    // 카테고리 4
    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    c4?: string;
}
