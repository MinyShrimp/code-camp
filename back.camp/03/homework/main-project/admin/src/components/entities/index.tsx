import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { UserIndex } from './user';
import { AuthorIndex } from './author';

import { EntityIndexHeader } from './header';

export function EntityMain() {
    const [entityName, setEntityName] = useState<string>('');
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
                            <AuthorIndex
                                setReload={setEntityReloadFunction}
                                setEntityName={setEntityName}
                            />
                        }
                    />
                    <Route
                        path="/user/*"
                        element={
                            <UserIndex
                                setReload={setEntityReloadFunction}
                                setEntityName={setEntityName}
                            />
                        }
                    />
                </Routes>
            </div>
        </main>
    );
}
