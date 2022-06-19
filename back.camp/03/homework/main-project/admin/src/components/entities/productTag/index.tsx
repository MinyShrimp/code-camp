import React, { useEffect } from 'react';
import { EntityIndex } from '../entity_index';
import { ListProductTagColumns, ShowProductTagColumns } from './columns';

export function ProductTagIndex(props: {
    setReload: Function;
    setEntityName: Function;
}) {
    useEffect(() => {
        props.setEntityName('Product Tag');
    }, []);

    return (
        <EntityIndex
            setReload={props.setReload}
            ListUrl="/admin/product-tags"
            ListColumns={ListProductTagColumns}
            ShowUrl="/admin/product-tag"
            ShowColumns={ShowProductTagColumns}
        />
    );
}
