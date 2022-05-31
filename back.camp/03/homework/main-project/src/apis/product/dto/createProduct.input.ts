import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export default class CreateProductInput {
    @Field(() => String)
    url: string;

    @Field(() => Int)
    stock_count: number;
}
