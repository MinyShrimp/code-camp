import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class CreateAuthorInput {
    @Field(() => String)
    name: string;

    @Field(() => String)
    description: string;
}
