import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { KeyboardArrowDown } from '@material-ui/icons';
import { IColumn } from './interface';
import { useNavigate } from 'react-router-dom';

export function EntityTable(props: {
    columns: Array<TableColumn<any>>;
    datas: Array<IColumn>;
    pending: boolean;
}) {
    const navigate = useNavigate();

    return (
        <DataTable
            columns={props.columns}
            data={props.datas}
            pagination
            responsive
            fixedHeader
            fixedHeaderScrollHeight="calc(100vh - 250px)"
            pointerOnHover
            highlightOnHover
            onRowClicked={(row) => {
                navigate(`${window.location.pathname}/${row.id}`);
            }}
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
