import { TableColumn } from 'react-data-table-component';
import { IUserColumn } from './interface';

export const columns: Array<TableColumn<IUserColumn>> = [
    {
        name: 'ID',
        selector: (row: IUserColumn) => row.id,
        sortable: true,
    },
    {
        name: 'Name',
        selector: (row: IUserColumn) => row.name,
        sortable: true,
    },
    {
        name: 'Email',
        selector: (row: IUserColumn) => row.email,
        sortable: true,
    },
    {
        name: 'Point',
        selector: (row: IUserColumn) => row.point,
        sortable: true,
    },
    {
        name: 'LoginAt',
        selector: (row: IUserColumn) => row.loginAt,
        sortable: true,
    },
    {
        name: 'Logoutat',
        selector: (row: IUserColumn) => row.logoutAt,
        sortable: true,
    },
    {
        name: 'isLogin',
        selector: (row: IUserColumn) => row.isLogin,
        sortable: true,
    },
    {
        name: 'CreateAt',
        selector: (row: IUserColumn) => row.createAt,
        sortable: true,
    },
    {
        name: 'UpdateAt',
        selector: (row: IUserColumn) => row.updateAt,
        sortable: true,
    },
];
