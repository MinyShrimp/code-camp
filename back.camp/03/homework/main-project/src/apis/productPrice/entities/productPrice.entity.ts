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

    // 가격
    @Column()
    price: number;

    // 업데이트 시간
    @UpdateDateColumn()
    updateAt: Date;
}
