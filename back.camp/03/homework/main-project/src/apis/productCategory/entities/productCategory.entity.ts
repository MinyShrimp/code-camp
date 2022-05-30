/**
 * 상품 카테고리 Entity
 */

import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Tree,
    TreeChildren,
    TreeParent,
} from 'typeorm';

@Entity({ name: 'product_category' })
@Tree('closure-table')
export default class ProductCategoryEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @TreeChildren()
    children: ProductCategoryEntity[];

    @TreeParent()
    parent: ProductCategoryEntity;
}
