import React from 'react';
import { EntityFactory } from '../entity_factory';
import { DummyProductColumn, IProductColumn } from './interface';

// prettier-ignore
export const ProductIndex = EntityFactory.getEntity<IProductColumn>({
    name: 'Product',
    dummyData: DummyProductColumn,
    list: {
        column: [
            'id', 'name', 'url', 
            'stock_count', 'selling_count',
            'price', 'bookId', 'productCategoryId',
            'createAt', 'updateAt',
        ],
        url: '/admin/products'
    },
    show: {
        column: [
            'id', 'name', 'url', 
            'stock_count', 'selling_count',
            'price', 'bookId', 'productCategoryId',
            'createAt', 'updateAt', 'deleteAt',
        ],
        url: '/admin/product'
    }
    ,
    edit: {
        column: [
            'name', 'url', 'stock_count', 
            'price', 'bookId', 'productCategoryId',
        ],
        url: '/admin/product',
        default: {
            name: '', url: '', stock_count: 0,
            price: 0, bookId: '', productCategoryId: ''
        }
    }
    ,
    update: {
        column: [
            'name', 'url', 'stock_count', 'selling_count',
            'price', 'bookId', 'productCategoryId',
        ],
        url: '/admin/product',
        default: {
            name: '', url: '', stock_count: 0, selling_count: 0,
            price: 0, bookId: '', productCategoryId: ''
        }
    }
});
