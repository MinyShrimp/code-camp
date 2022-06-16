import { Field, InputType, PickType } from '@nestjs/graphql';
import { CreateBookImageInput } from '../../bookImage/dto/createBookImage.input';
import { BookEntity } from '../entities/book.entity';

@InputType()
export class CreateBookInput extends PickType(
    BookEntity,
    [
        'title',
        'subtitle',
        'description',
        'page',
        'isbn_10',
        'isbn_13',
        'publishAt',
    ],
    InputType,
) {
    @Field(() => String, { description: '출판사 ID' })
    publisherId: string;

    @Field(() => String, { description: '저자 ID' })
    authorId: string;
}
