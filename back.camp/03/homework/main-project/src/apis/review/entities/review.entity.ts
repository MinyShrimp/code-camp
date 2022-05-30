/**
 * 한 줄평 Entity
 */

import ProductEntity from 'src/apis/product/entities/product.entity';
import UserEntity from 'src/apis/user/entities/user.entity';
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

@Entity({ name: 'review' })
export default class ReviewEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // 내용
    @Column({ type: 'text' })
    contents: string;

    // 평점
    @Column({ type: 'decimal', precision: 1, scale: 1 })
    star: number;

    // 좋아요
    @Column()
    like: number;

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
    product: ProductEntity;

    // 유저
    @JoinColumn()
    @ManyToOne(() => UserEntity)
    user: UserEntity;
}
