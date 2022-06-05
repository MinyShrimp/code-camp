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
import { ProductEntity } from 'src/apis/product/entities/product.entity';

@Entity({ name: 'product_tag' })
@ObjectType({ description: '상품 태그 Entity' })
export class ProductTagEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    // 이름
    @Column()
    @Field(() => String, { description: '이름' })
    name: string;

    // 생성 시간
    @CreateDateColumn()
    createAt: Date;

    // 상품
    @Field(() => [ProductEntity])
    @ManyToMany(() => ProductEntity, (product) => product.productTags)
    products: Array<ProductEntity>;
}
