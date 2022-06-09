import { ReviewEntity } from '../../apis/review/entities/review.entity';
import { Resource } from '../interfaces/resource.interface';

export const ReviewResource: Resource = {
    resource: ReviewEntity,
    options: {
        listProperties: [
            'id',
            'contents',
            'star',
            'like',
            'userId',
            'productId',
            'createAt',
            'updateAt',
        ],
        editProperties: ['contents', 'star', 'like', 'userId', 'productId'],
        showProperties: [
            'id',
            'contents',
            'star',
            'like',
            'userId',
            'productId',
            'createAt',
            'updateAt',
            'deleteAt',
        ],
    },
};
