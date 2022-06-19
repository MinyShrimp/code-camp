import React, { useEffect, useRef } from 'react';
import { IconButton, Input, Switch } from '@material-ui/core';
import { CancelOutlined, CheckCircleOutlined, Menu } from '@material-ui/icons';

import { getType } from '../../functions/functions';
import { getDate, getDateFormatting } from '../../functions/times';

import { IEntityConfig } from './types';
import { EntityIndex } from './entity_index';

export class EntityFactory {
    private static createColumn<T>(dummy: T, config: Array<keyof T>) {
        return config.map((key, idx) => {
            const tmp: IEntityConfig = {
                name: key as string,
                data: dummy[key],
                type: getType(dummy[key]),
                sortable: true,
                selector: (row: any) => row[key],
                cell: undefined,
                edit_cell: (row: any, data: any) => {
                    return (
                        <Input
                            key={idx}
                            id={key as string}
                            style={{ width: '100%' }}
                            type={getType(dummy[key])}
                            defaultValue={data}
                            onInput={(event) => {
                                // @ts-ignore
                                row[key] = event.target.value;
                            }}
                        />
                    );
                },
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

    private static createListColumn<T>(dummy: T, config: Array<keyof T>) {
        return [
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
            ...this.createColumn<T>(dummy, config),
        ];
    }

    static getEntity<T>(columnConfig: {
        name: string;
        dummyData: T;
        list: {
            url: string;
            column: Array<keyof T>;
        };
        show: {
            url: string;
            column: Array<keyof T>;
        };
        edit: {
            url: string;
            default: Partial<T>;
            column: Array<keyof T>;
        };
        update: {
            url: string;
            default: Partial<T>;
            column: Array<keyof T>;
        };
    }) {
        const config = {
            listColumn: this.createListColumn<T>(
                columnConfig.dummyData,
                columnConfig.list.column,
            ),
            showColumn: this.createColumn<T>(
                columnConfig.dummyData,
                columnConfig.show.column,
            ),
            editColumn: this.createColumn<T>(
                columnConfig.dummyData,
                columnConfig.edit.column,
            ),
            updateColumn: this.createColumn<T>(
                columnConfig.dummyData,
                columnConfig.update.column,
            ),
        };

        return (props: { setReload: Function; setEntityName: Function }) => {
            const editInput = useRef(columnConfig.edit.default);

            useEffect(() => {
                props.setEntityName(columnConfig.name);
                return () => {};
            }, []);

            return (
                <EntityIndex
                    setReload={props.setReload}
                    ListUrl={columnConfig.list.url}
                    ShowUrl={columnConfig.show.url}
                    EditUrl={columnConfig.edit.url}
                    ListColumns={config.listColumn}
                    ShowColumns={config.showColumn}
                    EditColumns={config.editColumn}
                    EditInput={editInput}
                />
            );
        };
    }
}
