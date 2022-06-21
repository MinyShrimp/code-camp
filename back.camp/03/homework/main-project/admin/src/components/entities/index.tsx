import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { EntityIndexHeader } from './header';

import { UserIndex } from './user';
import { ReviewIndex } from './review';
import { PaymentIndex } from './payment';

import { BookIndex } from './book';
import { AuthorIndex } from './author';
import { PublisherIndex } from './publisher';
import { BookImageIndex } from './bookImage';

import { ProductIndex } from './product';
import { ProductTagIndex } from './productTag';
import { ProductCategoryIndex } from './productCategory';

import { FileIndex } from './file';

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
                    <Route
                        path="/book/image/*"
                        element={
                            <BookImageIndex
                                setReload={setEntityReloadFunction}
                                setEntityName={setEntityName}
                            />
                        }
                    />
                    <Route
                        path="/book/*"
                        element={
                            <BookIndex
                                setReload={setEntityReloadFunction}
                                setEntityName={setEntityName}
                            />
                        }
                    />
                    <Route
                        path="/product/category/*"
                        element={
                            <ProductCategoryIndex
                                setReload={setEntityReloadFunction}
                                setEntityName={setEntityName}
                            />
                        }
                    />
                    <Route
                        path="/product/tag/*"
                        element={
                            <ProductTagIndex
                                setReload={setEntityReloadFunction}
                                setEntityName={setEntityName}
                            />
                        }
                    />
                    <Route
                        path="/product/*"
                        element={
                            <ProductIndex
                                setReload={setEntityReloadFunction}
                                setEntityName={setEntityName}
                            />
                        }
                    />
                    <Route
                        path="/publisher/*"
                        element={
                            <PublisherIndex
                                setReload={setEntityReloadFunction}
                                setEntityName={setEntityName}
                            />
                        }
                    />
                    <Route
                        path="/review/*"
                        element={
                            <ReviewIndex
                                setReload={setEntityReloadFunction}
                                setEntityName={setEntityName}
                            />
                        }
                    />
                    <Route
                        path="/payment/*"
                        element={
                            <PaymentIndex
                                setReload={setEntityReloadFunction}
                                setEntityName={setEntityName}
                            />
                        }
                    />
                    <Route
                        path="/file/*"
                        element={
                            <FileIndex
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
