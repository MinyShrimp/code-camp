import { ProductEntity } from '../../apis/product/entities/product.entity';
import { Resource } from '../interfaces/resource.interface';

export const ProductResource: Resource = {
    resource: ProductEntity,
    options: {
        listProperties: [
            'id',
            'url',
            'price',
            'stock_count',
            'selling_count',
            'book_id',
            'product_category_id',
        ],
        editProperties: [
            'url',
            'price',
            'stock_count',
            'selling_count',
            'book_id',
            'product_category_id',
            'deleteAt',
        ],
        showProperties: [
            'id',
            'url',
            'price',
            'stock_count',
            'selling_count',
            'book_id',
            'product_category_id',
            'createAt',
            'updateAt',
            'deleteAt',
        ],
    },
};
