import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class CreatePublisherInput {
    // 이름
    @Field(() => String)
    name: string;

    // 설명
    @Field(() => String)
    description: string;
}
