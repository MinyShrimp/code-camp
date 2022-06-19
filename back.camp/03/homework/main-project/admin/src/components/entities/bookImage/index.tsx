import React, { useEffect } from 'react';
import { EntityIndex } from '../entity_index';
import { ListBookImageColumns, ShowBookImageColumns } from './columns';

export function BookImageIndex(props: {
    setReload: Function;
    setEntityName: Function;
}) {
    useEffect(() => {
        props.setEntityName('Book Image');
    }, []);

    return (
        <EntityIndex
            setReload={props.setReload}
            ListUrl="/admin/book-images"
            ListColumns={ListBookImageColumns}
            ShowUrl="/admin/book-image"
            ShowColumns={ShowBookImageColumns}
        />
    );
}
