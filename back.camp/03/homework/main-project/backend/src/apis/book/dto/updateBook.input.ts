import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateBookInput } from './createBook.input';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
    @Field(() => Boolean, { defaultValue: false })
    isChange?: boolean;
}
