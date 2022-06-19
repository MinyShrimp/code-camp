import React, { useEffect } from 'react';
import { EntityIndex } from '../entity_index';
import { ListReviewColumns, ShowReviewColumns } from './columns';

export function ReviewIndex(props: {
    setReload: Function;
    setEntityName: Function;
}) {
    useEffect(() => {
        props.setEntityName('Review');
    }, []);

    return (
        <EntityIndex
            setReload={props.setReload}
            ListUrl="/admin/reviews"
            ListColumns={ListReviewColumns}
            ShowUrl="/admin/review"
            ShowColumns={ShowReviewColumns}
        />
    );
}
