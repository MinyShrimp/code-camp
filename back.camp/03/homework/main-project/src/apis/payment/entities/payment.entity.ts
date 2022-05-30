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
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'payment' })
export default class PaymentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    money: number;

    @Column()
    state: boolean;

    @Column()
    type: string;

    @Column()
    paymentAt: Date;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @JoinColumn()
    @ManyToOne(() => UserEntity)
    user: UserEntity;

    @JoinColumn()
    @ManyToOne(() => ProductEntity)
    product: ProductEntity;
}
