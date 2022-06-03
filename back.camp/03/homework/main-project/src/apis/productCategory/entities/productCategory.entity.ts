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

    @Field(() => [ProductCategoryEntity], { nullable: true })
    @TreeChildren({ cascade: true })
    children: ProductCategoryEntity[];

    @TreeParent({ onDelete: 'CASCADE' })
    parent: ProductCategoryEntity;
}
