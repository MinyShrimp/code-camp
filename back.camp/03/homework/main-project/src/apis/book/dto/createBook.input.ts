import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';

@InputType()
export default class CreateBookInput {
    @Field(() => String)
    title: string;

    @Field(() => String)
    subtitle: string;

    @Field(() => String)
    description: string;

    @Min(0)
    @Field(() => Int)
    page: number;

    @Field(() => String)
    isbn_10: string;

    @Field(() => String)
    isbn_13: string;

    @Field(() => Date)
    publish_at: Date;
}
