import React from 'react';
import { getDefaultDate } from '../../../functions/functions';
import { EntityFactory } from '../entity_factory';
import { DummyBookColumn, IBookColumn } from './interface';

// prettier-ignore
export const BookIndex = EntityFactory.getEntity<IBookColumn>({
    name: 'Book',
    dummyData: DummyBookColumn,
    list: {
        column: [
            'id', 'title', 'subtitle', 'description',
            'page', 'isbn_10', 'isbn_13', 'publishAt',
            'publisherId', 'authorId',
            'createAt', 'updateAt', 
        ],
        url: '/admin/books',
    },
    show: {
        column: [
            'id', 'title', 'subtitle', 'description',
            'page', 'isbn_10', 'isbn_13', 'publishAt',
            'publisherId', 'authorId',
            'createAt', 'updateAt', 'deleteAt', 
        ],
        url: '/admin/book',
    },
    edit: {
        column: [
            'title', 'subtitle', 'description',
            'page', 'isbn_10', 'isbn_13', 'publishAt',
            'publisherId', 'authorId',
        ],
        url: '/admin/book',
        default: {
            title: '', subtitle: '', description: '',
            page: 0, isbn_10: '', isbn_13: '', publishAt: getDefaultDate(),
            publisherId: '', authorId: ''
        },
    },
    update: {
        column: [
            'title', 'subtitle', 'description',
            'page', 'isbn_10', 'isbn_13', 'publishAt',
            'publisherId', 'authorId',
        ],
        url: '/admin/book',
        default: {
            title: '', subtitle: '', description: '',
            page: 0, isbn_10: '', isbn_13: '', publishAt: getDefaultDate(),
            publisherId: '', authorId: ''
        },
    },
});
