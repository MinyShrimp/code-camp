/**
 * 상품 카테고리 Entity
 * depth 2
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'product_category_2' })
export default class ProductCategory2Entity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
}
