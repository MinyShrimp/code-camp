/**
 * 상품 카테고리 Entity
 * depth 2
 */

import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import ProductCategory1Entity from './productCategory1.entity';

@ObjectType()
@Entity({ name: 'product_category_2' })
export default class ProductCategory2Entity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => ProductCategory1Entity)
    @JoinColumn()
    @ManyToOne(() => ProductCategory1Entity)
    parent: ProductCategory1Entity;
}
