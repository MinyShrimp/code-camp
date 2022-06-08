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
        'publish_at',
    ],
    InputType,
) {
    @Field(() => String, { description: '출판사 ID' })
    publisher_id: string;

    @Field(() => String, { description: '저자 ID' })
    author_id: string;

    @Field(() => [CreateBookImageInput])
    book_imgs: CreateBookImageInput[];
}
