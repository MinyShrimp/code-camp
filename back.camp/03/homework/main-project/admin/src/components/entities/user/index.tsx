import axios from 'axios';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { EntityBaseIndex } from '../entity_base_index';
import { EntityIndividualIndex } from '../entity_individual_index';

import { columns } from './columns';
import { IUserColumn } from './interface';

export function UserIndex(props: { setReload: Function }) {
    const [datas, setDatas] = useState<IUserColumn[]>([]);
    const [data, setData] = useState<IUserColumn>();

    return (
        <Routes>
            <Route
                path="*"
                element={<EntityIndividualIndex data={datas[0]} />}
            />
            <Route
                path="/"
                element={
                    <EntityBaseIndex
                        reload={async () => {
                            return new Promise((resolve, reject) => {
                                axios
                                    .get('http://localhost:3000/admin/users')
                                    .then((res) => {
                                        setDatas(res.data as IUserColumn[]);
                                        resolve(res);
                                    })
                                    .catch((error) => {
                                        reject(error);
                                    });
                            });
                        }}
                        setReload={props.setReload}
                        columns={columns}
                        datas={datas}
                    />
                }
            />
        </Routes>
    );
}
