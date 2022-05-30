/**
 * 상품 카테고리 Entity
 * depth 0
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product_category_0' })
export default class ProductCategory0Entity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
}
