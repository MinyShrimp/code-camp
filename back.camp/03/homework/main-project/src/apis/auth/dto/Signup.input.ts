import { Field, InputType, PickType } from '@nestjs/graphql';
import { UserEntity } from '../../user/entities/user.entity';

@InputType()
export class SignupInput extends PickType(
    UserEntity,
    ['name', 'email'],
    InputType,
) {
    @Field(() => String, { description: '비밀번호' })
    pwd: string;
}
