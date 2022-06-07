import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductEntity } from '../entities/product.entity';

@InputType()
export class CreateProductInput extends PickType(
    ProductEntity,
    ['url', 'stock_count'],
    InputType,
) {
    @Min(0)
    @Field(
        () => Int, //
        { description: '가격' },
    )
    price: number;

    @Field(
        () => String, //
        { description: '카테고리 ID' },
    )
    category_id: string;

    @Field(
        () => [String], //
        { description: '태그 목록 ( #몽환적인 )' },
    )
    product_tags: string[];
}
