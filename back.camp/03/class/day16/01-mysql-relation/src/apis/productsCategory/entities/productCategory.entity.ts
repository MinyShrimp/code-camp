/**
 * 상품 카테고리 Entity
 */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "product_category" })
export default class ProductCategoryEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    // 이름
    @Column()
    name: string;
}
