import React from 'react';
import { EntityIndex } from '../entity_index';
import { ListAuthorColumns, ShowAuthorColumns } from './columns';

export function AuthorIndex(props: { setReload: Function }) {
    return (
        <EntityIndex
            setReload={props.setReload}
            ListUrl="/admin/authors"
            ListColumns={ListAuthorColumns}
            ShowUrl="/admin/author"
            ShowColumns={ShowAuthorColumns}
        />
    );
}
