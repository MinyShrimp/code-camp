import React, { useEffect } from 'react';
import { EntityIndex } from '../entity_index';
import { ListAuthorColumns, ShowAuthorColumns } from './columns';

export function AuthorIndex(props: {
    setReload: Function;
    setEntityName: Function;
}) {
    useEffect(() => {
        props.setEntityName('Author');
    }, []);

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
