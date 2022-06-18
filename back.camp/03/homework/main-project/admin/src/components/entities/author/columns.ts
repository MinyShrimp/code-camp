import { createColumns } from '../../../functions/createColumns';
import { DummyAuthorColumn } from './interface';

// prettier-ignore
export const AuthorColumnConfig = {
    listColumns: [
        'id', 'name', 'description', 
        'createAt', 'updateAt'
    ],
    showColumns: [
        'id', 'name', 'description',
        'createAt', 'updateAt', 'deleteAt',
    ],
};

export const ListAuthorColumns = createColumns(
    DummyAuthorColumn,
    AuthorColumnConfig.listColumns,
);

export const ShowAuthorColumns = createColumns(
    DummyAuthorColumn,
    AuthorColumnConfig.showColumns,
);
