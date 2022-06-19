import { createColumns } from '../../../functions/createColumns';
import { DummyFileColumn } from './interface';

// prettier-ignore
export const FileColumnConfig = {
    listColumns: [
        'id', 'name', 'path', 'url',
        'createAt', 'deleteAt',
    ],
    showColumns: [
        'id', 'name', 'path', 'url',
        'createAt', 'deleteAt',
    ],
};

export const ListFileColumns = createColumns(
    DummyFileColumn,
    FileColumnConfig.listColumns,
);

export const ShowFileColumns = createColumns(
    DummyFileColumn,
    FileColumnConfig.showColumns,
);
