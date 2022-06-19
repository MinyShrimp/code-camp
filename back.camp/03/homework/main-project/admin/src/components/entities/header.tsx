import React from 'react';
import { IconButton } from '@material-ui/core';
import { Add, Delete, FilterList, Replay } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export function EntityIndexHeader(props: {
    entityName: string;
    reload: Function;
}) {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                }}
            >
                <div>
                    <p className="mb-0" style={{ color: 'var(--bs-blue)' }}>
                        Entity
                    </p>
                    <h1 className="mb-0" id="entity_name">
                        {props.entityName}
                    </h1>
                </div>
                <div>
                    <Link
                        to={`/admin/entity/${props.entityName
                            .split(' ')
                            .join('/')
                            .toLowerCase()}/edit`}
                    >
                        <IconButton
                            className="mb-0"
                            size="small"
                            style={{ color: 'var(--bs-success)' }}
                        >
                            <Add />
                        </IconButton>
                    </Link>
                    <IconButton
                        className="mb-0"
                        size="small"
                        style={{ color: 'var(--bs-red)' }}
                        onClick={async () => {}}
                    >
                        <FilterList />
                    </IconButton>
                    <IconButton
                        className="mb-0"
                        size="small"
                        color="primary"
                        onClick={async () => {
                            await props.reload();
                        }}
                    >
                        <Replay />
                    </IconButton>
                </div>
            </div>
            <hr></hr>
        </>
    );
}
