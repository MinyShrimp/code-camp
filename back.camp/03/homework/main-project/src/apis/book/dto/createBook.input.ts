import { InputType, PickType } from '@nestjs/graphql';
import BookEntity from '../entities/book.entity';

@InputType()
export default class CreateBookInput extends PickType(
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
) {}
