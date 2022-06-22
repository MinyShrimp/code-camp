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
            'price', 'book', 'productCategory',
            'createAt', 'updateAt',
        ],
        option: {
            book: "title",
            productCategory: "name"
        },
        url: '/admin/products'
    },
    show: {
        column: [
            'id', 'name', 'url', 
            'stock_count', 'selling_count',
            'price', 'book', 'productCategory', 'productTags',
            'createAt', 'updateAt', 'deleteAt',
        ],
        option: {
            book: "title",
            productCategory: "name"
        },
        url: '/admin/product'
    },
    edit: {
        column: [
            'name', 'url', 'stock_count', 'price', 
            'bookID', 'productCategoryID', 'productTagsInput',
        ],
        url: {
            'default': '/admin/product',
            'bookID': '/admin/book/names',
            'productCategoryID': '/admin/product-category/names'
        },
        default: {
            name: '', url: '', stock_count: 0,
            price: 0, bookID: '', productCategoryID: '', productTagsInput: ''
        }
    },
    update: {
        column: [
            'name', 'url', 'stock_count', 'selling_count', 'price', 
            'bookID', 'productCategoryID', 'productTagsInput',
        ],
        url: {
            'default': '/admin/product',
            'bookID': '/admin/book/names',
            'productCategoryID': '/admin/product-category/names'
        },
        default: {
            name: '', url: '', stock_count: 0, selling_count: 0,
            price: 0, bookID: '', productCategoryID: '', productTagsInput: ''
        }
    }
});
