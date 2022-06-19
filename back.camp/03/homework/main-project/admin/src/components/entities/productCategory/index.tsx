import React, { useEffect } from 'react';
import { EntityIndex } from '../entity_index';
import {
    ListProductCategoryColumns,
    ShowProductCategoryColumns,
} from './columns';

export function ProductCategoryIndex(props: {
    setReload: Function;
    setEntityName: Function;
}) {
    useEffect(() => {
        props.setEntityName('Product Category');
    }, []);

    return (
        <EntityIndex
            setReload={props.setReload}
            ListUrl="/admin/product-categorys"
            ListColumns={ListProductCategoryColumns}
            ShowUrl="/admin/product-category"
            ShowColumns={ShowProductCategoryColumns}
        />
    );
}
