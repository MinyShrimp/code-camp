import React, { useEffect, useState } from 'react';

import { EntityTable } from '../entity_table';

import { columns } from './columns';
import { IUserColumn } from './interface';

export function UserIndex({ setReload }) {
    const [pending, setPending] = useState(true);
    const datas: IUserColumn[] = [];

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
            name: 'User' + i,
            email: 'Email' + i,
            point: i,
            loginAt: new Date().toUTCString(),
            logoutAt: new Date().toUTCString(),
            isLogin: true,
            createAt: new Date().toUTCString(),
            updateAt: new Date().toUTCString(),
        });
    }

    return <EntityTable columns={columns} datas={datas} pending={pending} />;
}
