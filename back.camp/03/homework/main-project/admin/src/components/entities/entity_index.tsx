import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { EntityEditIndex } from './entity_edit_index';

import { EntityListIndex } from './entity_list_index';
import { EntityShowIndex } from './entity_show_index';
import { IEntityConfig } from './types';

export function EntityIndex(props: {
    setReload: Function;
    list?: { column: IEntityConfig[]; url: string };
    show?: { column: IEntityConfig[]; url: string };
    edit?: { column: IEntityConfig[]; url: { [key in string]: string } };
    EditInput?: any;
}) {
    return (
        <Routes>
            {props.list ? (
                <Route
                    path="/"
                    element={
                        <EntityListIndex
                            url={props.list.url}
                            columns={props.list.column}
                            setReload={props.setReload}
                        />
                    }
                />
            ) : null}

            {props.edit ? (
                <Route
                    path="/edit"
                    element={
                        <EntityEditIndex
                            url={props.edit.url}
                            columns={props.edit.column}
                            setReload={props.setReload}
                            inputs={props.EditInput}
                        />
                    }
                />
            ) : null}

            {props.show ? (
                <Route
                    path="*"
                    element={
                        <EntityShowIndex
                            url={props.show.url}
                            columns={props.show.column}
                            setReload={props.setReload}
                        />
                    }
                />
            ) : null}
        </Routes>
    );
}
