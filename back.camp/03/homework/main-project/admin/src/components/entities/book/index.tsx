import React, { useEffect } from 'react';
import { EntityIndex } from '../entity_index';
import { ListBookColumns, ShowBookColumns } from './columns';

export function BookIndex(props: {
    setReload: Function;
    setEntityName: Function;
}) {
    useEffect(() => {
        props.setEntityName('Book');
    }, []);

    return (
        <EntityIndex
            setReload={props.setReload}
            ListUrl="/admin/books"
            ListColumns={ListBookColumns}
            ShowUrl="/admin/book"
            ShowColumns={ShowBookColumns}
        />
    );
}
