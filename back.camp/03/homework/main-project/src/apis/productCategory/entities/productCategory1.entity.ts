/**
 * 상품 카테고리 Entity
 * depth 1
 */

import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import ProductCategory0Entity from './productCategory0.entity';

@ObjectType()
@Entity({ name: 'product_category_1' })
export default class ProductCategory1Entity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => ProductCategory0Entity)
    @JoinColumn()
    @ManyToOne(() => ProductCategory0Entity)
    parent: ProductCategory0Entity;
}
