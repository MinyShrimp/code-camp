import React from 'react';
import { IconButton } from '@material-ui/core';
import { Replay } from '@material-ui/icons';

export function EntityIndexHeader({ entityName, reload }) {
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
                    <h1 className="mb-0">{entityName}</h1>
                </div>
                <IconButton
                    className="mb-0"
                    size="small"
                    color="primary"
                    onClick={reload}
                >
                    <Replay />
                </IconButton>
            </div>
            <hr></hr>
        </>
    );
}
