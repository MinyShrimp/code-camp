import { createColumns } from '../../../functions/createColumns';
import { DummyUserColumn } from './interface';

// prettier-ignore
export const UserColumnConfig = {
    listColumns: [
        'id', 'name', 'email', 'point', 
        'loginAt', 'logoutAt', 'isLogin',
        'createAt', 'updateAt', 'deleteAt',
    ],
    showColumns: [
        'id', 'name', 'email', 
        'pwd', 'point', 'isAdmin', 
        'loginAt', 'logoutAt', 'isLogin',
        'createAt', 'updateAt', 'deleteAt',
    ],
};

export const ListUserColumns = createColumns(
    DummyUserColumn,
    UserColumnConfig.listColumns,
);

export const ShowUserColumns = createColumns(
    DummyUserColumn,
    UserColumnConfig.showColumns,
);
