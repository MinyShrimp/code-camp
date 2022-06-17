import axios from 'axios';
import React, { useState } from 'react';

import { EntityBaseIndex } from '../entity_base_index';

import { columns } from './columns';
import { IUserColumn } from './interface';

export function UserIndex(props: { setReload: Function }) {
    const [datas, setDatas] = useState<IUserColumn[]>([]);

    return (
        <EntityBaseIndex
            reload={async () => {
                // await axios.post('http://localhost:3000/graphql', {});

                setDatas(
                    Array.from({ length: 100 }, (_, i) => {
                        return {
                            id: `${i + 1}`,
                            name: 'User' + i,
                            email: 'Email' + i,
                            point: i,
                            loginAt: new Date().toUTCString(),
                            logoutAt: new Date().toUTCString(),
                            isLogin: true,
                            createAt: new Date().toUTCString(),
                            updateAt: new Date().toUTCString(),
                        };
                    }),
                );
            }}
            setReload={props.setReload}
            columns={columns}
            datas={datas}
        />
    );
}
