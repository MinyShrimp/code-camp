import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { EntityTable } from './entity_table';
import { IColumn } from './interface';
import { IEntityConfig } from './types';

export function EntityListIndex(props: {
    url: string;
    setReload: Function;
    columns: Array<IEntityConfig>;
}) {
    const [datas, setDatas] = useState<IColumn[]>([]);
    const [pending, setPending] = useState<boolean>(true);

    const _reload = async () => {
        setPending(true);

        setDatas([]);
        axios
            .get(`${process.env.BE_URL}${props.url}`)
            .then((res: AxiosResponse) => {
                setDatas(res.data);
                setPending(false);
            })
            .catch((error) => {
                console.log(error);
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
        <EntityTable columns={props.columns} datas={datas} pending={pending} />
    );
}
