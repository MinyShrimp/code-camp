import { createColumns } from '../../../functions/createColumns';
import { DummyPaymentColumn } from './interface';

// prettier-ignore
export const PaymentColumnConfig = {
    listColumns: [
        'id', 'impUid', 'merchantUid',
        'amount', 'status', 'createAt',
        'userId', 'productId',
    ],
    showColumns: [
        'id', 'impUid', 'merchantUid',
        'amount', 'status', 'createAt',
        'userId', 'productId',
    ],
};

export const ListPaymentColumns = createColumns(
    DummyPaymentColumn,
    PaymentColumnConfig.listColumns,
);

export const ShowPaymentColumns = createColumns(
    DummyPaymentColumn,
    PaymentColumnConfig.showColumns,
);
