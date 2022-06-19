
import React, { useEffect } from 'react';
import { EntityIndex } from '../entity_index';
import { ListProductColumns, ShowProductColumns } from './columns';

export function ProductIndex(props: {
    setReload: Function;
    setEntityName: Function;
}) {
    useEffect(() => {
        props.setEntityName('Product');
    }, []);

    return (
        <EntityIndex
            setReload={props.setReload}
            ListUrl="/admin/products"
            ListColumns={ListProductColumns}
            ShowUrl="/admin/product"
            ShowColumns={ShowProductColumns}
        />
    );
}

