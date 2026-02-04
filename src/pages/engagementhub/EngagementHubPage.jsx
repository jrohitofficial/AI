import React, { useState, useRef } from 'react';
import Sidepanel2 from '../../components/layout/Sidepanel2';
import { engagementHubData } from '../../data/engagementHub';
import { MetricCard, ChecklistItem, QuickActionButton, RecentComment, ScrollIndicator } from '../../components';
import ActionButton from '../../components/ui/ActionButton';
import WorkspaceHeader from '../../components/ui/WorkspaceHeader';

const EngagementHubPage = ({ user, selectedClient, onLogout, onNavigateToDashboard, onNavigateToVATReconciliation, onNavigateToClientProfile, onNavigateToEngagement, onNavigateToGrossRevenue }) => {
    const [selectedChecklist, setSelectedChecklist] = useState(null);
    const [showExitConfirm, setShowExitConfirm] = useState(false);
    const mainContentRef = useRef(null);
    
    // Use selectedClient if available, otherwise use default data
    const clientData = selectedClient || { name: 'Default Client', pan: 'N/A' };

    // SVG Icons for Metrics
    const metricIcons = {
        wallet: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        chart: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        document: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        )
    };

    // SVG Icons for Quick Actions
    const quickActionIcons = {
        link: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
        ),
        document: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        chart: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        wallet: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1M7 11h6M3 6a1 1 0 011-1h16a1 1 0 011 1v2H3V6z" />
            </svg>
        ),
        arrow: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
        )
    };

    const handleQuickAction = (action) => {
        console.log('Quick action clicked:', action);
        // Can be extended to perform actual actions
    };

    const handleExitWorkspace = () => {
        setShowExitConfirm(true);
    };

    const handleConfirmExit = () => {
        setShowExitConfirm(false);
        onNavigateToDashboard();
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <Sidepanel2 activeItem="Engagement Hub" user={user} onNavigateToDashboard={onNavigateToDashboard} onNavigateToVATReconciliation={() => onNavigateToVATReconciliation(selectedClient)} onNavigateToClientProfile={() => onNavigateToClientProfile(selectedClient)} onNavigateToEngagement={onNavigateToEngagement} onNavigateToGrossRevenue={onNavigateToGrossRevenue} onLogout={onLogout} selectedClient={selectedClient} />

                {/* Main Content */}
                <div className="flex-1 ml-64 flex flex-col overflow-hidden relative">
                    {/* Header Navbar */}
                    <WorkspaceHeader
                        clientData={clientData}
                        onNavigateToDashboard={onNavigateToDashboard}
                        showExitConfirm={showExitConfirm}
                        onExitWorkspace={handleExitWorkspace}
                        onConfirmExit={handleConfirmExit}
                        onCancelExit={() => setShowExitConfirm(false)}
                    />

                    {/* Main Content Area */}
                    <main ref={mainContentRef} className="p-8 overflow-y-auto hide-scrollbar flex-1">
                    {/* Metrics Section */}
                    {/* Metrics + Audit (Left) and Quick Actions (Right) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        {/* Left Column (2/3 width) */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Metrics Section */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-full">
                                {engagementHubData.metrics.map((metric) => (
                                    <MetricCard
                                        key={metric.id}
                                        title={metric.title}
                                        value={metric.value}
                                        trend={metric.change}
                                        icon={metricIcons[metric.icon]}
                                    />
                                ))}
                            </div>

                            {/* Audit Checklist */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                                <div className="flex items-center justify-between px-6 py-4">
                                    <h2 className="text-lg font-bold text-gray-900">Audit Checklist Progress</h2>
                                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                                        View All
                                    </button>
                                </div>
                                <div className="border-t border-gray-200"></div>

                                <div className="px-6 py-4 space-y-3">
                                    {engagementHubData.auditChecklist.map((item) => (
                                        <ChecklistItem
                                            key={item.id}
                                            title={item.title}
                                            status={item.status}
                                            progress={item.progress}
                                            dueDate={item.dueDate}
                                            assignedTo={item.assignedTo}
                                            tasks={item.tasks}
                                            onViewDetails={() => setSelectedChecklist(item)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column (1/3 width) */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg shadow-md border-0 p-6">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Quick Actions
                                </h3>
                                <div className="space-y-3">
                                    {engagementHubData.quickActions.map((action) => (
                                        <button
                                            key={action.id}
                                            onClick={() => handleQuickAction(action.title)}
                                            className="w-full flex items-center justify-between p-4 rounded-full bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 transition-all text-left group border border-slate-600 hover:border-slate-500"
                                        >
                                            <span className="text-sm font-semibold text-white group-hover:text-gray-100">{action.title}</span>
                                            <span className="flex-shrink-0 text-white group-hover:translate-x-1 transition-transform">
                                                {quickActionIcons.arrow}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Comments */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-base font-bold text-gray-900 mb-4">Recent Comments</h3>
                                <div className="space-y-4">
                                    {engagementHubData.recentComments.map((comment) => (
                                        <RecentComment
                                            key={comment.id}
                                            author={comment.author}
                                            role={comment.role}
                                            comment={comment.comment}
                                            timestamp={comment.timestamp}
                                            avatar={comment.avatar}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Selected Checklist Detail Modal - Optional */}
                    {selectedChecklist && (
                        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {selectedChecklist.title}
                                    </h2>
                                    <button
                                        onClick={() => setSelectedChecklist(null)}
                                        className="text-2xl text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Status:</span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                            selectedChecklist.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                                            selectedChecklist.status === 'IN PROGRESS' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                            {selectedChecklist.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Progress:</span>
                                        <span className="text-lg font-bold text-gray-900">{selectedChecklist.progress}%</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Assigned to:</span>
                                        <span className="font-medium text-gray-900">{selectedChecklist.assignedTo}</span>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <h4 className="font-semibold text-gray-900 mb-3">Tasks</h4>
                                    <div className="space-y-2">
                                        {selectedChecklist.tasks.map((task, idx) => (
                                            <div key={idx} className="flex items-center gap-3 text-sm">
                                                <span className={`font-bold text-lg ${
                                                    task.status === 'COMPLETED' ? 'text-green-600' :
                                                    task.status === 'IN PROGRESS' ? 'text-blue-600' :
                                                    'text-gray-400'
                                                }`}>
                                                    {task.status === 'COMPLETED' ? '✓' :
                                                     task.status === 'IN PROGRESS' ? '→' : '○'}
                                                </span>
                                                <span className={task.status === 'COMPLETED' ? 'text-gray-500 line-through' : 'text-gray-700'}>
                                                    {task.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedChecklist(null)}
                                    className="w-full px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                    </main>
                    
                    {/* Scroll Indicator */}
                    <ScrollIndicator targetRef={mainContentRef} />
                </div>
            </div>
        </div>
    );
};

export default EngagementHubPage;
