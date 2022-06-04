import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsUrl } from 'class-validator';

@InputType()
export default class CreateBookImageInput {
    @IsUrl()
    @Field(() => String)
    url: string;

    @IsBoolean()
    @Field(() => Boolean)
    isMain: boolean;
}
