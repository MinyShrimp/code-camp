import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { EntityTable } from './entity_table';
import { IColumn } from './interface';

export function EntityBaseIndex(props: {
    reload: any;
    setReload: Function;
    columns: Array<TableColumn<any>>;
    datas: Array<IColumn>;
}) {
    const [pending, setPending] = useState<boolean>(true);

    const _reload = async () => {
        setPending(true);
        props
            .reload()
            .then((res: AxiosResponse) => {
                setPending(false);
            })
            .catch((error: any) => {
                setPending(false);
            });
    };

    useEffect(() => {
        props.setReload(() => _reload);

        (async () => {
            await _reload();
        })();

        return () => {};
    }, [props.setReload]);

    return (
        <EntityTable
            columns={props.columns}
            datas={props.datas}
            pending={pending}
        />
    );
}
