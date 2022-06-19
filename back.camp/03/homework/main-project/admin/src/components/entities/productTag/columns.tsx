import { createColumns } from '../../../functions/createColumns';
import { DummyProductTagColumn } from './interface';

// prettier-ignore
export const ProductTagColumnConfig = {
    listColumns: [
        'id', 'name', 'createAt'
    ],
    showColumns: [
        'id', 'name', 'createAt'
    ],
};

export const ListProductTagColumns = createColumns(
    DummyProductTagColumn,
    ProductTagColumnConfig.listColumns,
);

export const ShowProductTagColumns = createColumns(
    DummyProductTagColumn,
    ProductTagColumnConfig.showColumns,
);
