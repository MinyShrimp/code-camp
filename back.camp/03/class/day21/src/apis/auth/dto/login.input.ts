import { Field, InputType } from "@nestjs/graphql";

@InputType()
export default class LoginInput {
    @Field(() => String)
    email: string;

    @Field(() => String)
    pwd: string;
}
