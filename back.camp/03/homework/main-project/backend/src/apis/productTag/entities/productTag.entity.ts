/**
 * 상품 태그 Entity
 */

import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProductEntity } from '../../product/entities/product.entity';

@Entity({ name: 'product_tag' })
@ObjectType({ description: '상품 태그 Entity' })
export class ProductTagEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    // 이름
    @Column({ unique: true })
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
