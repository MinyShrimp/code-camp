import React from 'react';
import { EntityFactory } from '../entity_factory';
import { DummyProductColumn } from '../product/interface';
import { DummyUserColumn } from '../user/interface';
import { IReviewColumn, DummyReviewColumn } from './interface';

// prettier-ignore
export const ReviewIndex = EntityFactory.getEntity<IReviewColumn>({
    name: 'Review',
    dummyData: DummyReviewColumn,
    list: {
        column: [
            'id', 'contents', 'star', 'like',
            'createAt', 'updateAt', 'deleteAt',
            'product', 'user',
        ],
        url: '/admin/reviews'
    },
    show: {
        column: [
            'id', 'contents', 'star', 'like',
            'createAt', 'updateAt', 'deleteAt',
            'product', 'user',
        ],
        url: '/admin/review'
    }
    ,
    edit: {
        column: [
            'contents', 'star', 'like',
            'product', 'user',
        ],
        url: '/admin/review',
        default: {
            contents: '', star: 0, like: false,
            product: DummyProductColumn, user: DummyUserColumn,
        }
    }
    ,
    update: {
        column: [
            'contents', 'star', 'like',
            'product', 'user',
        ],
        url: '/admin/review',
        default: {
            contents: '', star: 0, like: false,
            product: DummyProductColumn, user: DummyUserColumn,
        }
    }
});
