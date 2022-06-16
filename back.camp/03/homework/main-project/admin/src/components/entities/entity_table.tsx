import React from 'react';
import DataTable from 'react-data-table-component';
import { KeyboardArrowDown } from '@material-ui/icons';

export function EntityTable({ columns, datas, pending }) {
    return (
        <DataTable
            columns={columns}
            data={datas}
            pagination
            responsive
            fixedHeader
            fixedHeaderScrollHeight="calc(100vh - 250px)"
            sortIcon={<KeyboardArrowDown />}
            progressPending={pending}
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
