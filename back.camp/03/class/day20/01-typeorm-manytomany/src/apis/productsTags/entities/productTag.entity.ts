import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "@nestjs/graphql";

import ProductEntity from "src/apis/products/entities/product.entity";

@ObjectType()
@Entity({ name: "product_tag" })
export default class ProductTagEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => [ProductEntity])
    @ManyToMany(() => ProductEntity, (products) => products.productTags)
    products: Array<ProductEntity>;
}
