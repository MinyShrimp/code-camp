/**
 * 한 줄평 Entity
 */

import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

import ProductEntity from 'src/apis/product/entities/product.entity';
import UserEntity from 'src/apis/user/entities/user.entity';

@ObjectType()
@Entity({ name: 'review' })
export default class ReviewEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // 내용
    @Field(() => String)
    @Column({ type: 'text' })
    contents: string;

    // 평점
    @Field(() => Float)
    @Column({ type: 'decimal', precision: 1, scale: 1 })
    star: number;

    // 좋아요
    @Field(() => Int)
    @Column()
    like: number;

    // 생성 시간
    @Field(() => Date)
    @CreateDateColumn()
    createAt: Date;

    // 업데이트 시간
    @Field(() => Date)
    @UpdateDateColumn()
    updateAt: Date;

    // 삭제 시간
    @Field(() => Date)
    @DeleteDateColumn()
    deleteAt: Date;

    // 상품
    @Field(() => ProductEntity)
    @JoinColumn()
    @ManyToOne(() => ProductEntity)
    product: ProductEntity;

    // 유저
    @Field(() => UserEntity)
    @JoinColumn()
    @ManyToOne(() => UserEntity)
    user: UserEntity;
}
