import React, { useEffect } from 'react';
import { EntityIndex } from '../entity_index';
import {
    ListProductCategorySearchColumns,
    ShowProductCategorySearchColumns,
} from './columns';

export function ProductCategorySearchIndex(props: {
    setReload: Function;
    setEntityName: Function;
}) {
    useEffect(() => {
        props.setEntityName('Product Category Search');
    }, []);

    return (
        <EntityIndex
            setReload={props.setReload}
            ListUrl="/admin/product-category-searchs"
            ListColumns={ListProductCategorySearchColumns}
            ShowUrl="/admin/product-category-search"
            ShowColumns={ShowProductCategorySearchColumns}
        />
    );
}
