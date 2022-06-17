import { TableColumn } from 'react-data-table-component';
import { IAuthorColumn } from './interface';

export const columns: Array<TableColumn<IAuthorColumn>> = [
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
        name: 'Description',
        selector: (row) => row.description,
        sortable: true,
    },
    {
        name: 'CreateAt',
        selector: (row) => row.createAt,
        sortable: true,
    },
];
