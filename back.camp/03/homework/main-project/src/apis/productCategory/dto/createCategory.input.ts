import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export default class CreateCategoryInput {
    @Field(() => String)
    name: string;

    @Field(() => Int)
    depth: number;
}
