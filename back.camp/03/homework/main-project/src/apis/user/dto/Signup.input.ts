import { Field, InputType, PickType } from '@nestjs/graphql';
import UserEntity from '../entities/user.entity';

@InputType()
export default class SignupInput extends PickType(
    UserEntity,
    ['name', 'email'],
    InputType,
) {
    @Field(() => String)
    pwd: string;
}
