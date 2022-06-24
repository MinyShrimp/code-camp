import { Route, Routes } from 'react-router-dom';
import { LogicForgotEmailIndex } from './forgot-email';
import { LogicForgotPasswordIndex } from './forgot-pwd';
import { LogicLoginIndex } from './login';
import { LogicLogoutIndex } from './logout';
import { LogicRegisterIndex } from './register';

export function LogicMain() {
    return (
        <div className="p-4">
            <Routes>
                <Route path="/register" element={<LogicRegisterIndex />} />
                <Route path="/login" element={<LogicLoginIndex />} />
                <Route path="/logout" element={<LogicLogoutIndex />} />
                <Route
                    path="/forgot/email"
                    element={<LogicForgotEmailIndex />}
                />
                <Route
                    path="/forgot/password"
                    element={<LogicForgotPasswordIndex />}
                />
            </Routes>
        </div>
    );
}
