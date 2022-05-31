import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import ProductEntity from "src/apis/products/entities/product.entity";

@Entity({ name: "product_tag" })
export default class ProductTagEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => ProductEntity, (products) => products.productTags)
    products: Array<ProductEntity>;
}
