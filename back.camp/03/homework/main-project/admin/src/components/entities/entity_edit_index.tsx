import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { IEntityConfig } from './types';
import { useNavigate } from 'react-router-dom';

export function EntityEditIndex(props: {
    setReload: Function;
    url: { [key in string]: string };
    columns: Array<IEntityConfig>;
    inputs: any;
}) {
    const [pending, setPending] = useState<boolean>(false);
    const navi = useNavigate();

    const submit = async () => {
        setPending(true);
        console.log(props.inputs.current);
        axios
            .post(`${process.env.BE_URL}${props.url['default']}`, {
                ...props.inputs.current,
            })
            .then((res) => {
                console.log(res);
                setPending(false);
                navi(
                    `/admin/entity/${props.url['default']
                        .split('/')
                        .slice(-1)}`,
                );
            })
            .catch((error) => {
                console.log(error);
                setPending(false);
            });
    };

    useEffect(() => {
        props.setReload(() => async () => {});
        return () => {};
    }, [props.setReload]);

    return (
        <div
            style={{
                background: 'var(--bs-gray-100)',
                width: '100%',
                height: 'calc(100vh - 210px)',
                padding: '3rem',
                overflowY: 'scroll',
            }}
        >
            {props.columns.map((column, idx) => {
                return (
                    <div className="mb-4" key={idx}>
                        <label htmlFor={column.name as string} className="mb-1">
                            {' '}
                            {column.name}{' '}
                        </label>
                        <column.edit_cell
                            row={props.inputs.current}
                            data={props.inputs.current[column.name]}
                        />
                    </div>
                );
            })}
            <Button variant="contained" color="primary" onClick={submit}>
                Submit
            </Button>
        </div>
    );
}
