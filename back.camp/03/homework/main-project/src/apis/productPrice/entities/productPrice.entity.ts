/**
 * 상품 가격 Entity
 */

import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Min } from 'class-validator';
import {
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'product_price' })
@ObjectType({ description: '상품 가격 Entity' })
export class ProductPriceEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    // 가격
    @Column()
    @Min(0)
    @Field(() => Int, { description: '상품 가격' })
    price: number;

    // 업데이트 시간
    @UpdateDateColumn()
    updateAt: Date;

    // 삭제 시간
    @DeleteDateColumn()
    deleteAt: Date;
}
