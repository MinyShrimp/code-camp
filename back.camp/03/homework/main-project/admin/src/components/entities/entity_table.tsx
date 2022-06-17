import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { KeyboardArrowDown } from '@material-ui/icons';
import { IColumn } from './interface';

export function EntityTable(props: {
    columns: Array<TableColumn<any>>;
    datas: Array<IColumn>;
    pending: boolean;
}) {
    return (
        <DataTable
            columns={props.columns}
            data={props.datas}
            pagination
            responsive
            fixedHeader
            fixedHeaderScrollHeight="calc(100vh - 250px)"
            sortIcon={<KeyboardArrowDown />}
            progressPending={props.pending}
            paginationPerPage={30}
            customStyles={{
                headCells: {
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        background: 'var(--bs-gray-800)',
                    },
                },
            }}
        />
    );
}
