import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export default class CreateProductCategoryInput {
    @Field(
        () => String, //
        { description: '분류 이름' },
    )
    name: string;

    @Field(
        () => ID, //
        { description: '상위 분류 ID', nullable: true },
    )
    parentID?: string;
}
