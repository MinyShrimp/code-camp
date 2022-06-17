import { TableColumn } from 'react-data-table-component';
import { IUserColumn } from './interface';

export const columns: TableColumn<IUserColumn>[] = [
    {
        name: 'ID',
        selector: (row) => row.id,
        sortable: true,
    },
    {
        name: 'Name',
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: 'Email',
        selector: (row) => row.email,
        sortable: true,
    },
    {
        name: 'Point',
        selector: (row) => row.point,
        sortable: true,
    },
    {
        name: 'LoginAt',
        selector: (row) => row.loginAt,
        sortable: true,
    },
    {
        name: 'Logoutat',
        selector: (row) => row.logoutAt,
        sortable: true,
    },
    {
        name: 'isLogin',
        selector: (row) => row.isLogin,
        sortable: true,
    },
    {
        name: 'CreateAt',
        selector: (row) => row.createAt,
        sortable: true,
    },
    {
        name: 'UpdateAt',
        selector: (row) => row.updateAt,
        sortable: true,
    },
];
