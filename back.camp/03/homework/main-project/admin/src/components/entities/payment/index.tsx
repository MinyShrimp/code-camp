import React from 'react';
import { EntityFactory } from '../entity_factory';
import { DummyPaymentColumn, IPaymentColumn } from './interface';

// prettier-ignore
export const PaymentIndex = EntityFactory.getEntity<IPaymentColumn>({
    name: 'Payment',
    dummyData: DummyPaymentColumn,
    list: {
        column: [
            'id', 'impUid', 'merchantUid',
            'amount', 'status', 
            'userId', 'productId',
            'createAt',
        ],
        url: '/admin/payments'
    },
    show: {
        column: [
            'id', 'impUid', 'merchantUid',
            'amount', 'status', 
            'userId', 'productId',
            'createAt',
        ],
        url: '/admin/payment'
    },
    edit: {
        column: [
            'impUid', 'merchantUid',
            'amount', 'status',
            'userId', 'productId',
        ],
        url: '/admin/payment',
        default: {
            impUid: '', merchantUid: '', status: '',
            amount: 0, userId: '', productId: ''
        }
    },
    update: {
        column: [
            'impUid', 'merchantUid',
            'amount', 'status',
            'userId', 'productId',
        ],
        url: '/admin/payment',
        default: {
            impUid: '', merchantUid: '', status: '',
            amount: 0, userId: '', productId: ''
        }
    }
});
