/**
 * 상품 가격 Entity
 */

import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'product_price' })
export default class ProductPriceEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // 가격
    @Field(() => Int)
    @Column()
    price: number;

    // 업데이트 시간
    @Field(() => Date)
    @UpdateDateColumn()
    updateAt: Date;
}
