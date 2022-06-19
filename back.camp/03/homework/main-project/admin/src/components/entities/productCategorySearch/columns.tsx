import { createColumns } from '../../../functions/createColumns';
import { DummyProductCategorySearchColumn } from './interface';

// prettier-ignore
export const ProductCategorySearchColumnConfig = {
    listColumns: [
        'id', 'name', 
        'c1', 'c2', 'c3', 'c4', 
        'deleteAt',
    ],
    showColumns: [
        'id', 'name', 
        'c1', 'c2', 'c3', 'c4', 
        'deleteAt',
    ],
};

export const ListProductCategorySearchColumns = createColumns(
    DummyProductCategorySearchColumn,
    ProductCategorySearchColumnConfig.listColumns,
);

export const ShowProductCategorySearchColumns = createColumns(
    DummyProductCategorySearchColumn,
    ProductCategorySearchColumnConfig.showColumns,
);
