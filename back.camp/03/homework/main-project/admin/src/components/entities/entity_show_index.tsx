import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { getLastPath } from '../../functions/functions';

export function EntityShowIndex(props: {
    url: string;
    setReload: Function;
    columns: Array<TableColumn<any>>;
}) {
    const pathName = window.location.pathname;
    const entityID = getLastPath(pathName);

    const [data, setData] = useState<any>(undefined);
    const [pending, setPending] = useState<boolean>(true);

    const _reload = async () => {
        setPending(true);

        setData(undefined);
        axios
            .get(`${process.env.BE_URL}${props.url}/${entityID}`)
            .then((res: AxiosResponse) => {
                setData(res.data);
                setPending(false);
            })
            .catch((error: any) => {
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
        <div
            style={{
                background: 'var(--bs-gray-300)',
                width: '100%',
                height: 'calc(100vh - 210px)',
                padding: '3rem',
            }}
        >
            {!pending && data !== undefined ? (
                props.columns.map((column, idx) => {
                    return (
                        <div className="mb-4" key={idx}>
                            <div>{column.name}</div>
                            <div>
                                {
                                    // prettier-ignore
                                    (column.cell === undefined
                                        ? column.selector === undefined ? '' : column.selector(data)
                                        : column.cell(data, idx, column, idx)
                                    ) as string
                                }
                            </div>
                        </div>
                    );
                })
            ) : (
                <>Loading...</>
            )}
        </div>
    );
}
