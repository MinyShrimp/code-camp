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

import UserEntity from "src/apis/users/entities/user.entity";

import ProductTagEntity from "src/apis/productsTags/entities/productTag.entity";
import ProductCategoryEntity from "src/apis/productsCategory/entities/productCategory.entity";
import ProductSalesLocationEntity from "src/apis/productsSaleslocation/entities/productSaleslocation.entity";

@Entity({ name: "product" })
export default class ProductEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    // 이름
    @Column()
    name: string;

    // 설명
    @Column()
    description: string;

    // 가격
    @Column()
    price: number;

    // 판매 여부
    @Column()
    isSoldout: boolean;

    // "상품 카테고리" M:1 연결
    @JoinColumn()
    @ManyToOne(() => ProductCategoryEntity)
    productCategory: ProductCategoryEntity;

    // "상품 거래 위치" 1:1 연결
    @JoinColumn()
    @OneToOne(() => ProductSalesLocationEntity)
    productSaleslocation: ProductSalesLocationEntity;

    // "유저" M:1 연결
    @JoinColumn()
    @ManyToOne(() => UserEntity)
    user: UserEntity;

    // "상품 태그" M:M 연결
    @JoinTable()
    @ManyToMany(() => ProductTagEntity, (productTags) => productTags.products)
    productTags: Array<ProductTagEntity>;
}
