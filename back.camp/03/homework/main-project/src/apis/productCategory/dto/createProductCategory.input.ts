import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export default class CreateProductCategoryInput {
    @Field(() => String)
    name: string;

    @Field(() => ID, { nullable: true })
    parentID?: string;
}
