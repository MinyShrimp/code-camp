import { Field, InputType, Int } from "@nestjs/graphql";
import { IsEmail } from "class-validator";

@InputType()
export default class SignupInput {
    @IsEmail()
    @Field(() => String)
    email: string;

    @Field(() => String)
    pwd: string;

    @Field(() => String)
    name: string;

    @Field(() => Int)
    age: number;
}
