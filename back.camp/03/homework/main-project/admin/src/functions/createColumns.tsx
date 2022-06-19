import React from 'react';
import { CancelOutlined, CheckCircleOutlined, Menu } from '@material-ui/icons';
import { TableColumn } from 'react-data-table-component';
import { getType } from './functions';
import { getDate, getDateFormatting } from './times';
import { IEntityConfig } from '../components/entities/types';
import { IconButton, Input, Switch } from '@material-ui/core';

export function createColumns(
    column: any,
    config: Array<string>,
): Array<IEntityConfig> {
    return config.map((key, idx) => {
        const tmp: IEntityConfig = {
            name: key,
            data: column[key],
            type: getType(column[key]),
            sortable: true,
            selector: (row: any) => row[key],
            cell: undefined,
            edit_cell: (row: any, data: any) => (
                <Input
                    key={idx}
                    id={key as string}
                    style={{ width: '100%' }}
                    type={getType(column[key])}
                    defaultValue={data}
                    onInput={(event) => {
                        // @ts-ignore
                        row[key] = event.target.value;
                    }}
                />
            ),
            minWidth: `calc((100% - 50px) / ${config.length})`,
        };

        if (tmp.name === 'pwd') {
            tmp.type = 'password';
            tmp.edit_cell = (row: any, data: any) => (
                <Input
                    key={idx}
                    id={tmp.name as string}
                    style={{ width: '100%' }}
                    type="password"
                    defaultValue={data}
                    onInput={(event) => {
                        // @ts-ignore
                        row['pwd'] = event.target.value;
                    }}
                />
            );
        }

        if (tmp.type === 'Date') {
            tmp.selector = (row: any) => {
                return row[key] !== null
                    ? getDateFormatting(getDate(row[key]))
                    : '';
            };
        } else if (tmp.type === 'Boolean') {
            tmp.cell = (row: any) => {
                return row[key] ? (
                    <CheckCircleOutlined key={idx} htmlColor="green" />
                ) : (
                    <CancelOutlined key={idx} htmlColor="red" />
                );
            };
            tmp.edit_cell = (row: any, data: any) => (
                <Switch
                    key={idx}
                    id={tmp.name as string}
                    defaultChecked={data}
                    onChange={(event) => {
                        row[tmp.name] = event.target.checked;
                    }}
                />
            );
        }

        return tmp;
    });
}

export function createListColumns(
    column: any,
    config: Array<string>,
): Array<IEntityConfig> {
    const result = [
        {
            name: '',
            data: '',
            type: 'String',
            sortable: false,
            selector: () => '',
            edit_cell: () => <></>,
            cell: () => {
                return (
                    <IconButton size="small" className="m-0">
                        {' '}
                        <Menu />{' '}
                    </IconButton>
                );
            },
            width: '50px',
        },
        ...createColumns(column, config),
    ];

    return result;
}
