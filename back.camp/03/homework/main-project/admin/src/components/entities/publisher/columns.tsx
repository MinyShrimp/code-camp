import { createColumns } from '../../../functions/createColumns';
import { DummyPublisherColumn } from './interface';

// prettier-ignore
export const PublisherColumnConfig = {
    listColumns: [
        'id', 'name', 'description', 
        'createAt', 'updateAt'
    ],
    showColumns: [
        'id', 'name', 'description', 
        'createAt', 'updateAt', 'deleteAt'
    ],
};

export const ListPublisherColumns = createColumns(
    DummyPublisherColumn,
    PublisherColumnConfig.listColumns,
);

export const ShowPublisherColumns = createColumns(
    DummyPublisherColumn,
    PublisherColumnConfig.showColumns,
);
