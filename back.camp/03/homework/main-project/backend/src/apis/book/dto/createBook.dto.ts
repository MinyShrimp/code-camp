import { PickType } from '@nestjs/graphql';
import { BookEntity } from '../entities/book.entity';

export class CreateBookDTO extends PickType(BookEntity, [
    'title',
    'subtitle',
    'description',
    'page',
    'isbn_10',
    'isbn_13',
    'publish_at',
]) {}
