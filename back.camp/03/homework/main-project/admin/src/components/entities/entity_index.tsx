import React from 'react';
import { TableColumn } from 'react-data-table-component';
import { Route, Routes } from 'react-router-dom';

import { EntityListIndex } from './entity_list_index';
import { EntityShowIndex } from './entity_show_index';

export function EntityIndex(props: {
    setReload: Function;
    ListUrl: string;
    ListColumns: TableColumn<any>[];
    ShowUrl: string;
    ShowColumns: TableColumn<any>[];
}) {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <EntityListIndex
                        url={props.ListUrl}
                        columns={props.ListColumns}
                        setReload={props.setReload}
                    />
                }
            />

            <Route
                path="*"
                element={
                    <EntityShowIndex
                        url={props.ShowUrl}
                        columns={props.ShowColumns}
                        setReload={props.setReload}
                    />
                }
            />
        </Routes>
    );
}
