import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class FetchProductCategoryOutput {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    name: string;

    @Field(() => [FetchProductCategoryOutput])
    children: FetchProductCategoryOutput[];
}
