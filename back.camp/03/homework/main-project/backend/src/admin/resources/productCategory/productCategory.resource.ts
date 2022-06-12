import adminBro from 'admin-bro';
import { ProductCategoryEntity } from '../../../apis/productCategory/entities/productCategory.entity';
import { Resource } from '../../interfaces/resource.interface';

export const ProductCategoryResource: Resource = {
    resource: ProductCategoryEntity,
    options: {
        listProperties: ['id', 'name', 'parentId'],
        editProperties: ['name', 'parentId'],
        showProperties: ['id', 'name', 'parentId'],

        actions: {
            createSearchCategory: {
                actionType: 'resource',
                component: adminBro.bundle(
                    './components/createSearchCategory.component.jsx',
                ),
            },
        },
    },
};
