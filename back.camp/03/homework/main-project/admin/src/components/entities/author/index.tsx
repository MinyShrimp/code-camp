import React, { useEffect, useState } from 'react';

import { EntityTable } from '../entity_table';

import { columns } from './columns';
import { IAuthorColumn } from './interface';

export function AuthorIndex({ setReload }) {
    const [pending, setPending] = useState(true);
    const datas: IAuthorColumn[] = [];

    const reload = () => {
        setPending(true);
        const timeout = setTimeout(() => {
            setPending(false);
            clearTimeout(timeout);
        }, 1000);
    };

    useEffect(() => {
        setReload(() => reload);
        reload();
        return () => {};
    }, [setReload]);

    for (let i = 0; i < 100; i++) {
        datas.push({
            id: `${i + 1}`,
            name: 'Author' + i,
            description: 'Desc' + i,
            createAt: new Date().toUTCString(),
        });
    }

    return <EntityTable columns={columns} datas={datas} pending={pending} />;
}
