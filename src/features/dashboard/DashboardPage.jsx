import React, { useState, useRef } from 'react';
import Navbar from '../../components/layout/Navbar';
import SidePanel from '../../components/layout/SidePanel';
import MetricCard from '../../components/ui/MetricCard';
import ClientCard from './ClientCard';
import AddClientModal from './AddClientModal';
import { ScrollIndicator, Button, ExportMenu } from '../../components';
import { clients as initialClients } from '../../data/clients';

const DashboardPage = ({ user, onLogout, onNavigateToEngagement, onNavigateToVATReconciliation, onNavigateToClientProfile }) => {
    const [clients, setClients] = useState(initialClients);
    const [selectedYear, setSelectedYear] = useState('FY 2080/81');
    const [showExportMenu, setShowExportMenu] = useState(false);
    const [showAddClientModal, setShowAddClientModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const mainContentRef = useRef(null);

    // Filter clients based on search query
    const filteredClients = clients.filter(client => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        return (
            client.name.toLowerCase().includes(query) ||
            client.pan.toLowerCase().includes(query) ||
            client.sector.toLowerCase().includes(query)
        );
    });

    const metrics = [
        { 
            title: 'Active Audit Clients', 
            value: 3, 
            trend: '+3 This Month'
        },
        { 
            title: 'Pending Submission', 
            value: 12, 
            subtitle: 'Requires Attention', 
            subtitleColor: 'text-rose-600'
        },
        { 
            title: 'Days to IRD Deadlines', 
            value: 5, 
            badge: 'Urgent',
            badgeColor: 'bg-orange-50 text-orange-700'
        },
        { 
            title: 'Completed', 
            value: 28, 
            subtitle: 'Fiscal Year 2081/2082',
            subtitleColor: 'text-blue-600'
        },
    ];

    const handleAddClient = (newClient) => {
        setClients([...clients, newClient]);
        setShowAddClientModal(false);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
            <div className="flex flex-1 overflow-hidden">
                <SidePanel user={user} activeItem="Client Portfolio" onNavigateToEngagements={onNavigateToEngagement} />
                
                <div className="flex-1 ml-64 flex flex-col overflow-hidden relative">
                    <Navbar user={user} onLogout={onLogout} searchQuery={searchQuery} onSearchChange={setSearchQuery} clients={clients} />
                    {/* Main Content */}
                    <main ref={mainContentRef} className="p-8 overflow-y-auto hide-scrollbar flex-1">
                    {/* Page Title */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Client Portfolio</h1>
                                <p className="text-gray-500 mt-1">Select a client to manage their FY 2080/81 audit engagement.</p>
                            </div>
                            <div className="flex gap-3">
                                <div className="relative">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        className="px-4 py-2 font-medium text-sm"
                                        onClick={() => setShowExportMenu(!showExportMenu)}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                                        </svg>
                                        Export Report
                                    </Button>
                                    <ExportMenu isOpen={showExportMenu} onClose={() => setShowExportMenu(false)} />
                                </div>
                                <Button
                                    type="button"
                                    variant="primary"
                                    className="px-4 py-2 font-medium text-sm"
                                    onClick={() => setShowAddClientModal(true)}
                                >
                                    <span className="text-lg leading-none">+</span> New Client
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-4 gap-4 mb-8">
                        {metrics.map((metric, index) => (
                            <MetricCard key={index} {...metric} />
                        ))}
                    </div>

                    {/* Client Workspace Hub */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Client Workspace Hub</h2>
                                <p className="text-gray-500 mt-1">Select a client to manage their FY 2081/82 audit engagement.</p>
                            </div>
                            <div className="flex gap-2">
                                <button className={`px-4 py-2 rounded-lg font-medium text-sm ${
                                    selectedYear === 'FY 2080/81' 
                                        ? 'bg-gray-900 text-white' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}>
                                    FY 2080/81
                                </button>
                                <button className={`px-4 py-2 rounded-lg font-medium text-sm ${
                                    selectedYear === 'FY 2079/80' 
                                        ? 'bg-gray-900 text-white' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}>
                                    FY 2079/80
                                </button>
                                <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 font-medium text-sm">
                                    All Years
                                </button>
                                <button className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Client Cards Grid */}
                    <div className="grid grid-cols-3 gap-6">
                        {filteredClients.map((client) => (
                            <ClientCard 
                                key={client.id} 
                                client={client}
                                onAction={() => onNavigateToEngagement(client)}
                            />
                        ))}

                        {/* Add New Client Card */}
                        <Button
                            type="button"
                            onClick={() => setShowAddClientModal(true)}
                            className="bg-white rounded-lg p-6 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer min-h-[300px] text-center"
                        >
                            <div className="text-gray-300 mb-4">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-700 mb-2">Add New Audit Client</h3>
                            <p className="text-sm text-gray-500 text-center mb-4">
                                Onboard a new client for the current fiscal<br/>year cycle.
                            </p>
                            <span className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 font-medium text-sm">
                                Start Onboarding
                            </span>
                        </Button>
                    </div>

                    {/* Add Client Modal */}
                    <AddClientModal 
                        isOpen={showAddClientModal}
                        onClose={() => setShowAddClientModal(false)}
                        onAddClient={handleAddClient}
                        variant="drawer"
                    />

                    {/* Footer Stats */}
                    <div className="mt-8 flex items-center justify-between text-sm text-gray-500">
                        <div>Total Active Clients: <span className="font-semibold text-gray-700">{filteredClients.length}</span>{searchQuery && <span className="text-xs ml-2 text-gray-500">(of {clients.length})</span>}</div>
                        <div className="flex items-center gap-4">
                            <div>Avg. Completion: <span className="font-semibold text-gray-700">65%</span></div>
                            <button className="text-blue-600 hover:underline flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Support Hub
                            </button>
                        </div>
                    </div>
                </main>
                
                {/* Scroll Indicator */}
                <ScrollIndicator targetRef={mainContentRef} />
            </div>
            </div>
        </div>
    );
};

export default DashboardPage;
