
import React, { useEffect } from 'react';
import { EntityIndex } from '../entity_index';
import { ListPublisherColumns, ShowPublisherColumns } from './columns';

export function PublisherIndex(props: {
    setReload: Function;
    setEntityName: Function;
}) {
    useEffect(() => {
        props.setEntityName('Publisher');
    }, []);

    return (
        <EntityIndex
            setReload={props.setReload}
            ListUrl="/admin/publishers"
            ListColumns={ListPublisherColumns}
            ShowUrl="/admin/publisher"
            ShowColumns={ShowPublisherColumns}
        />
    );
}

