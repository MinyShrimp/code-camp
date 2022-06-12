import { BookEntity } from '../../../apis/book/entities/book.entity';
import { Resource } from '../../interfaces/resource.interface';

export const BookResource: Resource = {
    resource: BookEntity,
    options: {
        listProperties: [
            'id',
            'title',
            'subtitle',
            'description',
            'page',
            'isbn_10',
            'isbn_13',
            'publish_at',
        ],
        editProperties: [
            'title',
            'subtitle',
            'description',
            'page',
            'isbn_10',
            'isbn_13',
            'publish_at',
            'publisherId',
            'authorId',
            'deleteAt',
        ],
        showProperties: [
            'id',
            'title',
            'subtitle',
            'description',
            'page',
            'isbn_10',
            'isbn_13',
            'publish_at',
            'publisherId',
            'authorId',
            'createAt',
            'updateAt',
            'deleteAt',
        ],
    },
};
