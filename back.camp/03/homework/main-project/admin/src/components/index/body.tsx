import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Page401 } from '../pages/401';
import { Page404 } from '../pages/404';
import { Page500 } from '../pages/500';

import { DashboardPage } from '../dashboard/index';

import { IndexBodySide } from './body_side';
import { IndexBodyFooter } from './body_footer';

export function IndexBody() {
    return (
        <div id="layoutSidenav" style={{ height: '92vh' }}>
            <IndexBodySide />
            <div
                id="layoutSidenav_content"
                style={{ overflowX: 'hidden', overflowY: 'auto' }}
            >
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/401" element={<Page401 />} />
                    <Route path="/404" element={<Page404 />} />
                    <Route path="/500" element={<Page500 />} />
                </Routes>
                <IndexBodyFooter />
            </div>
        </div>
    );
}
