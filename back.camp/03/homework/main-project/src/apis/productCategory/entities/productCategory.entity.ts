/**
 * 상품 카테고리 Entity
 *
 * Closure Pattern ( Tree )
 */

import { Field, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Tree,
    TreeChildren,
    TreeParent,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'product_category' })
@Tree('closure-table')
export default class ProductCategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    // 이름
    @Column()
    @Field(() => String)
    name: string;

    // 자식
    @TreeChildren()
    @Field(() => [ProductCategoryEntity])
    children: ProductCategoryEntity[];

    // 부모
    @TreeParent()
    @Field(() => ProductCategoryEntity)
    parent: ProductCategoryEntity;
}
