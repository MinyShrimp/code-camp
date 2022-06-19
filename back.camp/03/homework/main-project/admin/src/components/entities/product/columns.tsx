import { createColumns } from '../../../functions/createColumns';
import { DummyProductColumn } from './interface';

// prettier-ignore
export const ProductColumnConfig = {
    listColumns: [
        'id', 'name', 'url', 'stock_count', 'selling_count',
        'price', 'bookId', 'productId', 'createAt', 'updateAt',
    ],
    showColumns: [
        'id', 'name', 'url', 'stock_count', 'selling_count',
        'price', 'bookId', 'productId', 'createAt', 'updateAt', 'deleteAt',
    ],
};

export const ListProductColumns = createColumns(
    DummyProductColumn,
    ProductColumnConfig.listColumns,
);

export const ShowProductColumns = createColumns(
    DummyProductColumn,
    ProductColumnConfig.showColumns,
);
