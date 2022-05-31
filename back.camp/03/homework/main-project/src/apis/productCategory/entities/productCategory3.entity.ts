/**
 * 상품 카테고리 Entity
 * depth 3
 */

import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import ProductCategory2Entity from './productCategory2.entity';

@ObjectType()
@Entity({ name: 'product_category_3' })
export default class ProductCategory3Entity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => ProductCategory2Entity)
    @JoinColumn()
    @ManyToOne(() => ProductCategory2Entity)
    parent: ProductCategory2Entity;
}
