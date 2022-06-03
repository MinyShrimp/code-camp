import { Field, InputType, PickType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

import SignupInput from './Signup.input';

@InputType()
export default class LoginInput extends PickType(SignupInput, [
    'email',
    'pwd',
]) {
    @IsEmail()
    @Field(() => String)
    email: string;
}
