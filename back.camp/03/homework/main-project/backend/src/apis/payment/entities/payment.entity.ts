/**
 * 한 줄평 Entity
 */

import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    BaseEntity,
} from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, Min } from 'class-validator';

import { ProductEntity } from '../../product/entities/product.entity';
import { UserEntity } from '../../user/entities/user.entity';

/* 결제 Entity */
@Entity({ name: 'payment' })
@ObjectType({ description: '결제 Entity' })
export class PaymentEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column({ unsigned: true })
    @Min(0)
    @Field(() => Int, { description: '가격' })
    amount: number;

    @Column()
    @IsBoolean()
    @Field(() => Boolean, { description: '결제 성공 여부' })
    state: boolean;

    @Column()
    @Field(() => String, { description: '결제 방법' })
    type: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;

    @JoinColumn()
    @ManyToOne(() => UserEntity)
    @Field(() => UserEntity)
    user: UserEntity;

    @JoinColumn()
    @ManyToOne(() => ProductEntity)
    @Field(() => ProductEntity)
    product: ProductEntity;
}
