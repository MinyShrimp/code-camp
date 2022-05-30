/**
 * 상품 카테고리 Entity
 *
 * Closure Pattern ( Tree )
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

    // 이름
    @Column()
    name: string;

    // 자식
    @TreeChildren()
    children: ProductCategoryEntity[];

    // 부모
    @TreeParent()
    parent: ProductCategoryEntity;
}
