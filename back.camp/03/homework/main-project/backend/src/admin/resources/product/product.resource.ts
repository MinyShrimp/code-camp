import AdminJS from 'adminjs';
import { ProductEntity } from '../../../apis/product/entities/product.entity';
import { Resource } from '../../interfaces/resource.interface';

export const ProductResource: Resource = {
    resource: ProductEntity,
    options: {
        listProperties: [
            'id',
            'name',
            'url',
            'price',
            'stock_count',
            'selling_count',
            'bookId',
            'productCategoryId',
        ],
        editProperties: [
            'name',
            'url',
            'price',
            'stock_count',
            'selling_count',
            'bookId',
            'productCategoryId',
            'deleteAt',
        ],
        showProperties: [
            'id',
            'name',
            'url',
            'price',
            'stock_count',
            'selling_count',
            'bookId',
            'productCategoryId',
            'createAt',
            'updateAt',
            'deleteAt',
        ],

        actions: {
            payment: {
                actionType: 'record',
                isVisible: true,
                component: AdminJS.bundle('./components/payment.component'),
                handler: async (req, res, ctx) => {
                    return {
                        record: ctx.record.toJSON(),
                        redirectUrl: ctx.h.resourceActionUrl({
                            resourceId: ctx.resource.id(),
                            actionName: 'list',
                        }),
                        notice: {
                            message: 'Successfully Payment',
                            type: 'success',
                        },
                    };
                },
            },
        },
    },
};
