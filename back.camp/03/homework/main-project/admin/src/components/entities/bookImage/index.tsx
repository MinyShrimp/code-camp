import React from 'react';
import { EntityFactory } from '../entity_factory';
import { DummyBookImageColumn, IBookImageColumn } from './interface';

// prettier-ignore
export const BookImageIndex = EntityFactory.getEntity<IBookImageColumn>({
    name: 'Book Image',
    dummyData: DummyBookImageColumn,
    list: {
        column: ['id', 'isMain', 'bookId', 'uploadImageId'],
        url: '/admin/book-images',
    },
    show: {
        column: ['id', 'isMain', 'bookId', 'uploadImageId', 'deleteAt'],
        url: '/admin/book-image',
    },
    edit: {
        column: ['isMain', 'bookId', 'uploadImageId'],
        url: '/admin/book-image',
        default: {
            isMain: false, bookId: '', uploadImageId: '',
        },
    },
    update: {
        column: ['isMain', 'bookId', 'uploadImageId'],
        url: '/admin/book-image',
        default: {
            isMain: false, bookId: '', uploadImageId: '',
        },
    },
});
