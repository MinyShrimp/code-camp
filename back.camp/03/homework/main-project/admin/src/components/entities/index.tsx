import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { UserIndex } from './user';
import { AuthorIndex } from './author';

import { EntityIndexHeader } from './header';
import { getLastPath, getFirstUpperCase } from '../../functions/functions';

export function EntityMain() {
    const pathName = window.location.pathname;
    const name = getLastPath(pathName);
    const entityName = getFirstUpperCase(name);

    const [entityReloadFunction, setEntityReloadFunction] = useState(
        () => async () => {},
    );

    return (
        <main>
            <div className="container-fluid px-4 pt-4">
                <EntityIndexHeader
                    entityName={entityName}
                    reload={entityReloadFunction}
                />
                <Routes>
                    <Route
                        path="/author/*"
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
