import { blue } from '@material-ui/core/colors';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { EntityTable } from './entity_table';
import { IColumn } from './interface';

export function EntityIndividualIndex(props: { data: any }) {
    return (
        <div
            style={{
                background: 'var(--bs-gray-300)',
                width: '100%',
                height: 'calc(100vh - 210px)',
                padding: '3rem',
            }}
        >
            {/* {props.data ??
                Object.keys(props.data).map((key, idx) => {
                    return (
                        <div className="mb-4" key={idx}>
                            <div>{key}</div>
                            <div>{props.data.id}</div>
                        </div>
                    );
                })} */}
            <div className="mb-4">
                <div>id</div>
                <div>ab45c138-d27a-4de3-8695-fb8ebb2e0e02</div>
            </div>
            <div className="mb-4">
                <div>name</div>
                <div>김회민</div>
            </div>
            <div className="mb-4">
                <div>email</div>
                <div>ksk7584@gmail.com</div>
            </div>
            <div className="mb-4">
                <div>pwd</div>
                <div>김회민</div>
            </div>
        </div>
    );
}
