import { ProductCategorySearchEntity } from '../../apis/productCategorySearch/entities/productCategorySearch.entity';
import { Resource } from '../interfaces/resource.interface';

export const ProductCategorySearchResource: Resource = {
    resource: ProductCategorySearchEntity,
    options: {
        listProperties: ['id', 'name', 'c1', 'c2', 'c3', 'c4'],
        editProperties: [],
        showProperties: ['id', 'name', 'c1', 'c2', 'c3', 'c4'],
    },
};
