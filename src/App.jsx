import React, { useState } from 'react';
import { LoginPage, DashboardPage, EngagementHubPage } from './pages';
import { Loader } from './components';
import './styles/global.css';

const App = () => {
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [selectedClient, setSelectedClient] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (userData) => {
        // Immediately proceed; show loader only during real data fetches
        setUser(userData);
        setCurrentPage('dashboard');
        setIsLoading(false);
    };

    const handleLogout = () => {
        setUser(null);
        setCurrentPage('login');
    };

    const handleNavigateToEngagement = (client) => {
        setSelectedClient(client);
        setCurrentPage('engagement');
    };

    const handleNavigateToDashboard = () => {
        setCurrentPage('dashboard');
        setSelectedClient(null);
    };

    return (
        <>
            {!user ? (
                <LoginPage onLogin={handleLogin} />
            ) : currentPage === 'engagement' ? (
                <EngagementHubPage user={user} selectedClient={selectedClient} onLogout={handleLogout} onNavigateToDashboard={handleNavigateToDashboard} />
            ) : (
                <DashboardPage user={user} onLogout={handleLogout} onNavigateToEngagement={handleNavigateToEngagement} />
            )}

            {isLoading && (
                <div className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-md flex items-center justify-center">
                    <Loader size="large" text="Setting things up..." />
                </div>
            )}
        </>
    );
};

export default App;
