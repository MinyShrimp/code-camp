import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    BaseEntity,
} from 'typeorm';
import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

import { ProductEntity } from '../../product/entities/product.entity';
import { UserEntity } from '../../user/entities/user.entity';

/* 리뷰 Entity */
@Entity({ name: 'review' })
@ObjectType({ description: '리뷰 Entity' })
export class ReviewEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    // 내용
    @Column({ type: 'text' })
    @Field(() => String, { description: '내용' })
    contents: string;

    // 평점
    @Column({ type: 'decimal', precision: 2, scale: 1 })
    @Field(() => Float, { description: '평점' })
    star: string;

    // 좋아요
    @Column({ default: false })
    @Field(() => Boolean, { description: '좋아요' })
    like: boolean;

    // 생성 시간
    @CreateDateColumn()
    createAt: Date;

    // 업데이트 시간
    @UpdateDateColumn()
    updateAt: Date;

    // 삭제 시간
    @DeleteDateColumn()
    deleteAt: Date;

    // 상품
    @JoinColumn()
    @ManyToOne(() => ProductEntity)
    @Field(() => ProductEntity)
    product: ProductEntity;

    @Column({ name: 'productId', type: 'uuid' })
    productID: string;

    // 유저
    @JoinColumn()
    @ManyToOne(() => UserEntity)
    @Field(() => UserEntity)
    user: UserEntity;

    @Column({ name: 'userId', type: 'uuid' })
    userID: string;
}
