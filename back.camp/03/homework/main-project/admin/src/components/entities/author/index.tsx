import React, { useState } from 'react';

import { EntityBaseIndex } from '../entity_base_index';

import { columns } from './columns';
import { IAuthorColumn } from './interface';

export function AuthorIndex(props: { setReload: Function }) {
    const [datas, setDatas] = useState<IAuthorColumn[]>([]);

    return (
        <EntityBaseIndex
            reload={async () => {
                setDatas(
                    Array.from({ length: 100 }, (_, i) => {
                        return {
                            id: `${i + 1}`,
                            name: 'Author' + i,
                            description: 'Desc' + i,
                            createAt: new Date().toUTCString(),
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
