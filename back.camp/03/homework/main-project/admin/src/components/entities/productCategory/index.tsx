import React from 'react';
import { EntityFactory } from '../entity_factory';
import {
    DummyProductCategoryColumn,
    IProductCategoryColumn,
} from './interface';

// prettier-ignore
export const ProductCategoryIndex =
    EntityFactory.getEntity<IProductCategoryColumn>({
        name: 'Product Category',
        dummyData: DummyProductCategoryColumn,
        list: {
            column: [
                'id', 'name', 'parentId'
            ],
            url: '/admin/product-categorys'
        },
        show: {
            column: [
                'id', 'name', 'parentId'
            ],
            url: '/admin/product-category'
        }
        ,
        edit: {
            column: [ 'name', 'parentId' ],
            url: '/admin/product-category',
            default: {
                name: '', parentId: ''
            }
        }
        ,
        update: {
            column: [ 'name', 'parentId' ],
            url: '/admin/product-category',
            default: {
                name: '', parentId: ''
            }
        }
    });
