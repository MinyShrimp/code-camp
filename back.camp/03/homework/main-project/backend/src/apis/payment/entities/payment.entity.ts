/**
 * 한 줄평 Entity
 */

import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { ProductEntity } from '../../product/entities/product.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { PAYMENT_STATUS } from '../enums/payment.enum';

/* 결제 Entity */
@Entity({ name: 'payment' })
@ObjectType({ description: '결제 Entity' })
export class PaymentEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    // 아임포트 UID
    @Column()
    @Field(() => String)
    impUid: string;

    // 아임포트 상품 UID
    @Column()
    @Field(() => String)
    merchantUid: string;

    // 결제 금액
    @Column()
    @Field(() => Int, { description: '결제 금액' })
    amount: number;

    // 상태
    @Column()
    @Field(() => PAYMENT_STATUS, { description: '결제 상태' })
    status: PAYMENT_STATUS;

    // 결제 시간
    @CreateDateColumn()
    createAt: Date;

    // 회원
    @JoinColumn({ name: 'userId' })
    @ManyToOne(() => UserEntity)
    @Field(() => UserEntity)
    user: UserEntity;

    @Column({ name: 'userId', type: 'uuid' })
    userId: string;

    // 상품
    @JoinColumn({ name: 'productId' })
    @ManyToOne(() => ProductEntity)
    @Field(() => ProductEntity)
    product: ProductEntity;

    @Column({ name: 'productId', type: 'uuid' })
    productId: string;
}
