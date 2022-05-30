/**
 * 상품 가격 Entity
 */

import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'product_price' })
export default class ProductPriceEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    price: number;

    @UpdateDateColumn()
    updateAt: Date;
}
