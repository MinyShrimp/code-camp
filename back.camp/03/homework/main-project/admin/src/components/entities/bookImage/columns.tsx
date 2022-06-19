import { createColumns } from '../../../functions/createColumns';
import { DummyBookImageColumn } from './interface';

// prettier-ignore
export const BookImageColumnConfig = {
    listColumns: [
        'id', 'isMain', 'bookId', 'updateImageId'
    ],
    showColumns: [
        'id', 'isMain', 'bookId', 'updateImageId', 'deleteAt'
    ],
};

export const ListBookImageColumns = createColumns(
    DummyBookImageColumn,
    BookImageColumnConfig.listColumns,
);

export const ShowBookImageColumns = createColumns(
    DummyBookImageColumn,
    BookImageColumnConfig.showColumns,
);
