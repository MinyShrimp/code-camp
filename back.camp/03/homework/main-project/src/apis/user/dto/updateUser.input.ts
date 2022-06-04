import { InputType, PartialType } from '@nestjs/graphql';
import SignupInput from './Signup.input';

@InputType()
export default class UpdateUserInput extends PartialType(SignupInput) {}