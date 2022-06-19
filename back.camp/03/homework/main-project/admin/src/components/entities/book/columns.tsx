import { createColumns } from '../../../functions/createColumns';
import { DummyBookColumn } from './interface';

// prettier-ignore
export const BookColumnConfig = {
    listColumns: [
        'id', 'title', 'subtitle', 'description',
        'page', 'isbn_10', 'isbn_13', 'publisherAt',
        'createAt', 'updateAt', 'publisherId', 'authorId'
    ],
    showColumns: [
        'id', 'title', 'subtitle', 'description',
        'page', 'isbn_10', 'isbn_13', 'publisherAt',
        'createAt', 'updateAt', 'deleteAt', 'publisherId', 'authorId'
    ],
};

export const ListBookColumns = createColumns(
    DummyBookColumn,
    BookColumnConfig.listColumns,
);

export const ShowBookColumns = createColumns(
    DummyBookColumn,
    BookColumnConfig.showColumns,
);
