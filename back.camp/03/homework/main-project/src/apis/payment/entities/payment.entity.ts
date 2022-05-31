/**
 * 한 줄평 Entity
 */

import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import ProductEntity from 'src/apis/product/entities/product.entity';
import UserEntity from 'src/apis/user/entities/user.entity';

@ObjectType()
@Entity({ name: 'payment' })
export default class PaymentEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => Int)
    @Column()
    money: number;

    @Field(() => Boolean)
    @Column()
    state: boolean;

    @Field(() => String)
    @Column()
    type: string;

    @Field(() => Date)
    @Column()
    paymentAt: Date;

    @Field(() => Date)
    @CreateDateColumn()
    createAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updateAt: Date;

    @Field(() => UserEntity)
    @JoinColumn()
    @ManyToOne(() => UserEntity)
    user: UserEntity;

    @Field(() => ProductEntity)
    @JoinColumn()
    @ManyToOne(() => ProductEntity)
    product: ProductEntity;
}
