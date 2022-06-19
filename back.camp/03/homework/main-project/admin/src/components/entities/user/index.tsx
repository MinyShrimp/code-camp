import React, { useEffect } from 'react';
import { EntityIndex } from '../entity_index';
import { ListUserColumns, ShowUserColumns } from './columns';

export function UserIndex(props: {
    setReload: Function;
    setEntityName: Function;
}) {
    useEffect(() => {
        props.setEntityName('User');
    }, []);

    return (
        <EntityIndex
            setReload={props.setReload}
            ListUrl="/admin/users"
            ListColumns={ListUserColumns}
            ShowUrl="/admin/user"
            ShowColumns={ShowUserColumns}
        />
    );
}
