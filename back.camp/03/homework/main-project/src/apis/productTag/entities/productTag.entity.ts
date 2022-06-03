/**
 * 상품 태그 Entity
 */

import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import ProductEntity from 'src/apis/product/entities/product.entity';

@ObjectType()
@Entity({ name: 'product_tag' })
export default class ProductTagEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // 이름
    @Field(() => String)
    @Column()
    name: string;

    // 생성 시간
    @CreateDateColumn()
    createAt: Date;

    // 상품
    @Field(() => [ProductEntity])
    @ManyToMany(() => ProductEntity, (product) => product.productTags)
    products: Array<ProductEntity>;
}
