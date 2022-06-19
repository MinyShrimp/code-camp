import { createColumns } from '../../../functions/createColumns';
import { DummyProductCategoryColumn } from './interface';

// prettier-ignore
export const ProductCategoryColumnConfig = {
    listColumns: [
        'id', 'name', 'productId'
    ],
    showColumns: [
        'id', 'name', 'productId'
    ],
};

export const ListProductCategoryColumns = createColumns(
    DummyProductCategoryColumn,
    ProductCategoryColumnConfig.listColumns,
);

export const ShowProductCategoryColumns = createColumns(
    DummyProductCategoryColumn,
    ProductCategoryColumnConfig.showColumns,
);
