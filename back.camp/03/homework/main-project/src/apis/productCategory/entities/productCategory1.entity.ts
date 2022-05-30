/**
 * 상품 카테고리 Entity
 * depth 1
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product_category_1' })
export default class ProductCategory1Entity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
}
