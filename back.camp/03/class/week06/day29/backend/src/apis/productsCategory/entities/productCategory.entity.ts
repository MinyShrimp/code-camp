/**
 * 상품 카테고리 Entity
 */

import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity({ name: "product_category" })
export default class ProductCategoryEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    // 이름
    @Field(() => String)
    @Column({ unique: true })
    name: string;
}
