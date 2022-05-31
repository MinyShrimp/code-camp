/**
 * 상품 Entity
 *
 * | id | PK |
 */

import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

import UserEntity from "src/apis/users/entities/user.entity";

import ProductTagEntity from "src/apis/productsTags/entities/productTag.entity";
import ProductCategoryEntity from "src/apis/productsCategory/entities/productCategory.entity";
import ProductSalesLocationEntity from "src/apis/productsSaleslocation/entities/productSaleslocation.entity";

@ObjectType()
@Entity({ name: "product" })
export default class ProductEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    // 이름
    @Field(() => String)
    @Column()
    name: string;

    // 설명
    @Field(() => String)
    @Column()
    description: string;

    // 가격
    @Field(() => Int)
    @Column({ unsigned: true })
    price: number;

    // 판매 여부
    @Field(() => Boolean)
    @Column({ default: false })
    isSoldout: boolean;

    // "상품 카테고리" M:1 연결
    @Field(() => ProductCategoryEntity)
    @JoinColumn()
    @ManyToOne(() => ProductCategoryEntity)
    productCategory: ProductCategoryEntity;

    // "상품 거래 위치" 1:1 연결
    @Field(() => ProductSalesLocationEntity)
    @JoinColumn()
    @OneToOne(() => ProductSalesLocationEntity)
    productSaleslocation: ProductSalesLocationEntity;

    // "유저" M:1 연결
    @Field(() => UserEntity)
    @JoinColumn()
    @ManyToOne(() => UserEntity)
    user: UserEntity;

    // "상품 태그" M:M 연결
    @Field(() => [ProductTagEntity])
    @JoinTable()
    @ManyToMany(() => ProductTagEntity, (productTags) => productTags.products)
    productTags: Array<ProductTagEntity>;
}
