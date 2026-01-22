import React, { useState } from 'react';
import { LoginPage, DashboardPage } from './pages';
import './styles/global.css';

const App = () => {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <>
            {!user ? (
                <LoginPage onLogin={handleLogin} />
            ) : (
                <DashboardPage user={user} onLogout={handleLogout} />
            )}
        </>
    );
};

export default App;
