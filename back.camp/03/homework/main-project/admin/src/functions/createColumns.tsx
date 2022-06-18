import React from 'react';
import { CancelOutlined, CheckCircleOutlined } from '@material-ui/icons';
import { TableColumn } from 'react-data-table-component';
import { getType } from './functions';
import { getDate, getDateFormatting } from './times';

export function createColumns(
    column: any,
    config: Array<string>,
): Array<TableColumn<any>> {
    return config.map((key, idx) => {
        const tmp: TableColumn<any> = {
            name: key,
            sortable: true,
            selector: (row: any) => row[key],
            cell: undefined,
        };

        const type = getType(column[key]);
        if (type === 'Date') {
            tmp['selector'] = (row: any) => {
                return row[key] !== null
                    ? getDateFormatting(getDate(row[key]))
                    : '';
            };
        } else if (type === 'Boolean') {
            tmp['cell'] = (row: any) => {
                return row[key] ? (
                    <CheckCircleOutlined htmlColor="green" />
                ) : (
                    <CancelOutlined htmlColor="red" />
                );
            };
        }

        return tmp;
    });
}
