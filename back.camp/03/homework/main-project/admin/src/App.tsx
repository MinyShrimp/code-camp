import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Index } from './components/index/index';
import { LoginPage } from './components/login/index';

function App() {
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
