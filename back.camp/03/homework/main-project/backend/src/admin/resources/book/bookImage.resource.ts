import { BookImageEntity } from '../../../apis/bookImage/entities/bookImage.entity';
import { Resource } from '../../interfaces/resource.interface';

export const BookImageResource: Resource = {
    resource: BookImageEntity,
    options: {
        listProperties: [
            'id',
            'url',
            'isMain',
            'bookId',
            'createAt',
            'updateAt',
        ],
        editProperties: ['url', 'isMain', 'bookId', 'deleteAt'],
        showProperties: [
            'id',
            'url',
            'isMain',
            'bookId',
            'createAt',
            'updateAt',
            'deleteAt',
        ],
    },
};
