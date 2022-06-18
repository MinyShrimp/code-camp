import React from 'react';
import { IconButton } from '@material-ui/core';
import { Replay } from '@material-ui/icons';

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
            <hr></hr>
        </>
    );
}
