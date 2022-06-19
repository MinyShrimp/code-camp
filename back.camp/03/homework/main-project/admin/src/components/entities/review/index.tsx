import React from 'react';
import { EntityFactory } from '../entity_factory';
import { IReviewColumn, DummyReviewColumn } from './interface';

// prettier-ignore
export const ReviewIndex = EntityFactory.getEntity<IReviewColumn>({
    name: 'Review',
    dummyData: DummyReviewColumn,
    list: {
        column: [
            'id', 'contents', 'star', 'like',
            'createAt', 'updateAt', 'deleteAt',
            'productId', 'userId',
        ],
        url: '/admin/reviews'
    },
    show: {
        column: [
            'id', 'contents', 'star', 'like',
            'createAt', 'updateAt', 'deleteAt',
            'productId', 'userId',
        ],
        url: '/admin/review'
    }
    ,
    edit: {
        column: [
            'contents', 'star', 'like',
            'productId', 'userId',
        ],
        url: '/admin/review',
        default: {
            contents: '', productId: '', userId: '',
            star: 0, like: false
        }
    }
    ,
    update: {
        column: [
            'contents', 'star', 'like',
            'productId', 'userId',
        ],
        url: '/admin/review',
        default: {
            contents: '', productId: '', userId: '',
            star: 0, like: false
        }
    }
});
