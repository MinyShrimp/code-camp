/**
 * 상품 Entity
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product_price' })
export default class ProductPriceEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    price: number;

    @Column({ type: 'timestamp' })
    updateAt: Date;
}
