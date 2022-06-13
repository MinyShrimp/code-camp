import AdminJS from 'adminjs';
import { PaymentEntity } from '../../../apis/payment/entities/payment.entity';
import { Resource } from '../../interfaces/resource.interface';

export const PaymentResource: Resource = {
    resource: PaymentEntity,
    options: {
        listProperties: [
            'id',
            'impUid',
            'amount',
            'status',
            'userId',
            'productId',
            'createAt',
        ],
        editProperties: ['amount', 'status', 'userId', 'productId'],
        showProperties: [
            'id',
            'impUid',
            'merchantUid',
            'amount',
            'status',
            'userId',
            'productId',
            'createAt',
        ],

        actions: {
            // cancelPayment: {
            //     actionType: 'record',
            //     isVisible: true,
            //     component: false,
            //     handler: async (req, res, ctx) => {
            //         await ctx.resource.update(req.params.recordId, {
            //             isLogin: false,
            //             logoutAt: new Date(),
            //         });
            //         return {
            //             record: ctx.record.toJSON(ctx.currentAdmin),
            //             redirectUrl: ctx.h.resourceActionUrl({
            //                 resourceId: ctx.resource.id(),
            //                 actionName: 'list',
            //             }),
            //             notice: {
            //                 message: 'Successfully CancelPayment',
            //                 type: 'success',
            //             },
            //         };
            //     },
            // },
        },
    },
};
