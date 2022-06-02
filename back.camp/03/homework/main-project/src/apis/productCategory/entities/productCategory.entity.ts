/**
 * 상품 카테고리 Entity
 * depth 0
 */

import { Field, ID, ObjectType } from '@nestjs/graphql';
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
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column()
    name: string;

    @TreeChildren({ cascade: ['remove'] })
    children: ProductCategoryEntity[];

    @TreeParent()
    parent: ProductCategoryEntity;
}
