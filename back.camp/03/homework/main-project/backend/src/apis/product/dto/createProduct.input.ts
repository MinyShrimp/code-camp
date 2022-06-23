import { Field, InputType, PickType } from '@nestjs/graphql';
import { ProductEntity } from '../entities/product.entity';

@InputType()
export class CreateProductInput extends PickType(
    ProductEntity,
    ['url', 'name', 'stock_count', 'price'],
    InputType,
) {
    @Field(
        () => String, //
        { description: '책 ID' },
    )
    bookID: string;

    @Field(
        () => String, //
        { description: '카테고리 ID' },
    )
    categoryID: string;

    @Field(
        () => [String], //
        { description: '태그 목록 ( #몽환적인 )' },
    )
    productTags: string[];
}
