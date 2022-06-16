import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { UserIndex } from './user';
import { AuthorIndex } from './author';

import { EntityIndexHeader } from './index_header';

export function EntityIndex() {
    const pathName = window.location.pathname;
    const name = pathName.split('/')[2];
    const entityName = name[0].toUpperCase() + name.slice(1).toLowerCase();

    const [entityReloadFunction, setEntityReloadFunction] = useState(
        () => () => {},
    );

    useEffect(() => {
        setEntityReloadFunction(() => () => {});
        return () => {};
    }, [setEntityReloadFunction]);

    return (
        <main>
            <div className="container-fluid px-4 pt-4">
                <EntityIndexHeader
                    entityName={entityName}
                    reload={entityReloadFunction}
                />
                <Routes>
                    <Route
                        path="/author"
                        element={
                            <AuthorIndex setReload={setEntityReloadFunction} />
                        }
                    />
                    <Route
                        path="/user"
                        element={
                            <UserIndex setReload={setEntityReloadFunction} />
                        }
                    />
                </Routes>
            </div>
        </main>
    );
}
