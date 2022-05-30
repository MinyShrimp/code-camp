/**
 * 상품 카테고리 Entity
 * depth 3
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product_category_3' })
export default class ProductCategory3Entity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
}
