import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export default class CreateProductInput {
    @Field(() => String)
    url: string;

    @Min(0)
    @Field(() => Int)
    stock_count: number;

    @Min(0)
    @Field(() => Int)
    price: number;

    @Field(() => String)
    category_id: string;

    @Field(() => [String])
    product_tags: string[];
}
