/**
 * 한 줄평 Entity
 */

import ProductEntity from 'src/apis/product/entities/product.entity';
import UserEntity from 'src/apis/user/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'review' })
export default class ReviewEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    contents: string;

    @Column({ type: 'decimal', precision: 1, scale: 1 })
    star: number;

    @Column()
    like: number;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @JoinColumn()
    @ManyToOne(() => ProductEntity)
    product: ProductEntity;

    @JoinColumn()
    @ManyToOne(() => UserEntity)
    user: UserEntity;
}
