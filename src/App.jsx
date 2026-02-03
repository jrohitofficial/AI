import React, { useState } from 'react';
import { LoginPage, DashboardPage, EngagementHubPage, MonthlyVATReconciliationPage } from './pages';
import ClientProfilePage from './pages/client-profile/ClientProfilePage';
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

    const handleNavigateToVATReconciliation = (client) => {
        setSelectedClient(client);
        setCurrentPage('vat-reconciliation');
    };

    const handleNavigateToDashboard = () => {
        setCurrentPage('dashboard');
        setSelectedClient(null);
    };

    const handleNavigateToClientProfile = (client) => {
        setSelectedClient(client);
        setCurrentPage('client-profile');
    };

    return (
        <>
            {!user ? (
                <LoginPage onLogin={handleLogin} />
            ) : currentPage === 'engagement' ? (
                <EngagementHubPage user={user} selectedClient={selectedClient} onLogout={handleLogout} onNavigateToDashboard={handleNavigateToDashboard} onNavigateToVATReconciliation={handleNavigateToVATReconciliation} onNavigateToClientProfile={handleNavigateToClientProfile} />
            ) : currentPage === 'vat-reconciliation' ? (
                <MonthlyVATReconciliationPage user={user} selectedClient={selectedClient} onLogout={handleLogout} onNavigateToDashboard={handleNavigateToDashboard} onNavigateToEngagement={handleNavigateToEngagement} onNavigateToClientProfile={handleNavigateToClientProfile} />
            ) : currentPage === 'client-profile' ? (
                <ClientProfilePage user={user} selectedClient={selectedClient} onLogout={handleLogout} onNavigateToDashboard={handleNavigateToDashboard} onNavigateToEngagement={handleNavigateToEngagement} onNavigateToVATReconciliation={handleNavigateToVATReconciliation} onNavigateToClientProfile={handleNavigateToClientProfile} />
            ) : (
                <DashboardPage user={user} onLogout={handleLogout} onNavigateToEngagement={handleNavigateToEngagement} onNavigateToVATReconciliation={handleNavigateToVATReconciliation} onNavigateToClientProfile={handleNavigateToClientProfile} />
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
