import { ProductCategoryEntity } from '../../apis/productCategory/entities/productCategory.entity';
import { Resource } from '../interfaces/resource.interface';

export const ProductCategoryResource: Resource = {
    resource: ProductCategoryEntity,
    options: {
        listProperties: ['id', 'name', 'parentId'],
        editProperties: ['id', 'name', 'parentId'],
        showProperties: ['id', 'name', 'parentId'],
    },
};
