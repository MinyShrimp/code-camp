import { ProductTagEntity } from '../../../apis/productTag/entities/productTag.entity';
import { Resource } from '../../interfaces/resource.interface';

export const ProductTagResource: Resource = {
    resource: ProductTagEntity,
    options: {
        listProperties: ['id', 'name', 'createAt'],
        editProperties: ['id', 'name'],
        showProperties: ['id', 'name', 'createAt'],
    },
};
