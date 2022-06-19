import React from 'react';
import { EntityFactory } from '../entity_factory';
import {
    DummyProductCategorySearchColumn,
    IProductCategorySearchColumn,
} from './interface';

// prettier-ignore
export const ProductCategorySearchIndex =
    EntityFactory.getEntity<IProductCategorySearchColumn>({
        name: 'Product Category Search',
        dummyData: DummyProductCategorySearchColumn,
        list: {
            column: [
                'id', 'name', 
                'c1', 'c2', 'c3', 'c4',
                'deleteAt',
            ],
            url: '/admin/product-category-searchs'
        },
        show: {
            column: [
                'id', 'name', 
                'c1', 'c2', 'c3', 'c4',
                'deleteAt',
            ],
            url: '/admin/product-category-search'
        },
        edit: {
            column: [
                'name', 'c1', 'c2', 'c3', 'c4',
            ],
            url: '/admin/product-category-search',
            default: {
                name: '', c1: '', c2: '', c3: '', c4: ''
            }
        },
        update: {
            column: [
                'name', 'c1', 'c2', 'c3', 'c4',
            ],
            url: '/admin/product-category-search',
            default: {
                name: '', c1: '', c2: '', c3: '', c4: ''
            }
        }
    });
