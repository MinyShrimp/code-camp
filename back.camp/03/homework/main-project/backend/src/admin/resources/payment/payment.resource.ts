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
    },
};
