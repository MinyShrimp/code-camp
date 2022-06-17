import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { UserIndex } from './user';
import { AuthorIndex } from './author';

import { EntityIndexHeader } from './header';

export function EntityIndex() {
    const pathName = window.location.pathname;
    const name = pathName.split('/').slice(-1).join(' ');
    const entityName = name[0].toUpperCase() + name.slice(1).toLowerCase();

    const [entityReloadFunction, setEntityReloadFunction] = useState(
        () => async () => {},
    );

    useEffect(() => {
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
                        path="/user/*"
                        element={
                            <UserIndex setReload={setEntityReloadFunction} />
                        }
                    />
                </Routes>
            </div>
        </main>
    );
}
