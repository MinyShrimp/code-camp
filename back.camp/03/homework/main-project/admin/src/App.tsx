import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Index } from './components/index/index';
import { LoginPage } from './components/login/index';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        const admin = {
            id: process.env.ADMIN_ID as string,
            pwd: process.env.ADMIN_PWD as string,
        };

        const _pwd = window.localStorage.getItem('admin');
        if (_pwd) {
            if (compareSync(admin.pwd, _pwd)) {
                window.localStorage.setItem(
                    'admin',
                    hashSync(admin.pwd, genSaltSync()),
                );
                navigate(window.location.pathname, { replace: true });
                return () => {};
            }
        }
        navigate('/login', { replace: true });
    }, [navigate]);

    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="*" element={<Index />}></Route>
            </Routes>
        </div>
    );
}

export default App;
