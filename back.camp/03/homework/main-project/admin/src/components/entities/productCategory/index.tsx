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
                'id', 'name', 'createAt', 'parent'
            ],
            option: {
                parent: 'name'
            },
            url: '/admin/product-categorys'
        },
        show: {
            column: [
                'id', 'name', 'createAt', 'parent'
            ],
            option: {
                parent: 'name'
            },
            url: '/admin/product-category'
        }
        ,
        edit: {
            column: [ 'name', 'parent' ],
            url: '/admin/product-category',
            default: {
                name: '', parent: { id: "parent", name: "" }
            }
        }
        ,
        update: {
            column: [ 'name', 'parent' ],
            url: '/admin/product-category',
            default: {
                name: '', parent: { id: "parent", name: "" }
            }
        }
    });
