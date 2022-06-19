import { createColumns } from '../../../functions/createColumns';
import { DummyReviewColumn } from './interface';

// prettier-ignore
export const ReviewColumnConfig = {
    listColumns: [
        'id', 'contents', 'star', 'like',
        'createAt', 'updateAt', 'deleteAt',
        'productId', 'userId',
    ],
    showColumns: [
        'id', 'contents', 'star', 'like',
        'createAt', 'updateAt', 'deleteAt',
        'productId', 'userId',
    ],
};

export const ListReviewColumns = createColumns(
    DummyReviewColumn,
    ReviewColumnConfig.listColumns,
);

export const ShowReviewColumns = createColumns(
    DummyReviewColumn,
    ReviewColumnConfig.showColumns,
);
