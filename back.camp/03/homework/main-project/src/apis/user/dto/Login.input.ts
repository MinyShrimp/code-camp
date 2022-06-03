import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

import SignupInput from './Signup.input';

@InputType()
export default class LoginInput extends SignupInput {
    @IsEmail()
    @Field(() => String)
    email: string;
}
