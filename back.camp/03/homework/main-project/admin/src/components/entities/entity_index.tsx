import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { EntityEditIndex } from './entity_edit_index';

import { EntityListIndex } from './entity_list_index';
import { EntityShowIndex } from './entity_show_index';
import { IEntityConfig } from './types';

export function EntityIndex(props: {
    setReload: Function;
    ListUrl: string;
    ShowUrl: string;
    EditUrl: string;
    ListColumns: IEntityConfig[];
    ShowColumns: IEntityConfig[];
    EditColumns: IEntityConfig[];
    EditInput: any;
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
                path="/edit"
                element={
                    <EntityEditIndex
                        url={props.EditUrl}
                        columns={props.EditColumns}
                        setReload={props.setReload}
                        inputs={props.EditInput}
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
