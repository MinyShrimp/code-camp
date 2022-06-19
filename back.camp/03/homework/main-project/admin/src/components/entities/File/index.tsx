import React, { useEffect } from 'react';
import { EntityIndex } from '../entity_index';
import { ListFileColumns, ShowFileColumns } from './columns';

export function FileIndex(props: {
    setReload: Function;
    setEntityName: Function;
}) {
    useEffect(() => {
        props.setEntityName('File');
    }, []);

    return (
        <EntityIndex
            setReload={props.setReload}
            ListUrl="/admin/files"
            ListColumns={ListFileColumns}
            ShowUrl="/admin/file"
            ShowColumns={ShowFileColumns}
        />
    );
}
