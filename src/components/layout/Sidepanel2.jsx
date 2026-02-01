import React from 'react';

const Sidepanel2 = ({ activeItem = 'Engagement Hub', user, onNavigateToDashboard, onNavigateToVATReconciliation, onNavigateToEngagement, onNavigateToClientProfile, onLogout }) => {
    // SVG Icon components - unique icons for each item
    const iconComponents = {
        clipboard: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        user: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
        fileText: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
        ),
        receipt: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-6 3v-3m-6-4h18a2 2 0 012 2v12a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2z" />
            </svg>
        ),
        trendingUp: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        ),
        package: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m0 0l-8-4m8 4v10l-8-4m8 4l8-4m0 0v10l-8 4" />
            </svg>
        ),
        pieChart: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3a9 9 0 110 18 9 9 0 010-18zm0 0v9m0-9a8.973 8.973 0 00-6.364 2.636" />
            </svg>
        ),
        briefcase: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m16 0a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2" />
            </svg>
        ),
        trendingDown: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
            </svg>
        ),
        barChart: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        building: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
            </svg>
        ),
        layers: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4 2 2 0 000-4zm0 2v2m0-6a2 2 0 100 4 2 2 0 000-4zm6 0a2 2 0 100 4 2 2 0 000-4zm-6 0v2m6-2v2M6 12a2 2 0 100 4 2 2 0 000-4zm0 2v2m0-6v2m12 6a2 2 0 100 4 2 2 0 000-4zm0 2v2m0-6v2" />
            </svg>
        ),
        scale: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 6M6 7l3 9M6 7l6-6m6 6l3-1m-3 1l-3 9a5.002 5.002 0 006.001 6M9 17l3 9m3-9l-3 9m3-9l6-6" />
            </svg>
        ),
        arrowRight: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
        ),
        arrowLeftRight: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m10 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
        ),
        bookmark: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 19V5z" />
            </svg>
        ),
        folder: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
        ),
        checkCircle: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        chatBubbles: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
        )
    };

    const menuSections = [
        {
            title: 'SETUP',
            items: [
            { id: 1, name: 'Engagement Hub', icon: iconComponents.clipboard, isDashboard: false, isEngagementHub: true },
            { id: 2, name: 'Client Profile', icon: iconComponents.user, isDashboard: false, isClientProfile: true },
            { id: 3, name: 'Letter of Engagement', icon: iconComponents.fileText, isDashboard: false }
            ]
        },
        {
            title: 'TRADING ACCOUNT',
            items: [
                { id: 4, name: 'Monthly VAT Reconciliation', icon: iconComponents.receipt, isDashboard: false, isVATReconciliation: true },
                { id: 5, name: 'Gross Revenue', icon: iconComponents.trendingUp, isDashboard: false },
                { id: 6, name: 'Inventories', icon: iconComponents.package, isDashboard: false },
                { id: 7, name: 'Ratio Summary & RID Compliance', icon: iconComponents.pieChart, isDashboard: false }
            ]
        },
        {
            title: 'PFS STATEMENT PREPARATION',
            items: [
                { id: 8, name: 'Operating and Finance Exp', icon: iconComponents.briefcase, isDashboard: false },
                { id: 9, name: 'Profit and Loss Account', icon: iconComponents.trendingDown, isDashboard: false },
                { id: 10, name: 'Ratio Summary & RID Compliancy', icon: iconComponents.barChart, isDashboard: false }
            ]
        },
        {
            title: 'PPE SCHEDULES',
            items: [
                { id: 11, name: 'Pool-wise PPE & Deferred Tax', icon: iconComponents.building, isDashboard: false },
                { id: 12, name: 'Deferred Tax Placement', icon: iconComponents.layers, isDashboard: false },
                { id: 13, name: 'Tax Reconciliation', icon: iconComponents.scale, isDashboard: false }
            ]
        },
        {
            title: 'FINANCIAL STATEMENTS',
            items: [
                { id: 14, name: 'Cash Flow Statement', icon: iconComponents.arrowRight, isDashboard: false },
                { id: 15, name: 'Statement of Change in Equity', icon: iconComponents.arrowLeftRight, isDashboard: false },
                { id: 16, name: 'Balance Sheet', icon: iconComponents.scale, isDashboard: false },
                { id: 17, name: 'Notes 3-1 - 3.5', icon: iconComponents.bookmark, isDashboard: false },
                { id: 18, name: 'Notes 3.6 - 3.11', icon: iconComponents.bookmark, isDashboard: false }
            ]
        },
        {
            title: 'FINALIZATION',
            items: [
                { id: 19, name: 'Financial Statements', icon: iconComponents.folder, isDashboard: false },
                { id: 20, name: 'Audit Report', icon: iconComponents.checkCircle, isDashboard: false },
                { id: 21, name: 'Auditors Opinions', icon: iconComponents.chatBubbles, isDashboard: false }
            ]
        }
    ];

    const handleItemClick = (itemName, isDashboard = false, isVATReconciliation = false, isEngagementHub = false, isClientProfile = false) => {
        if (isDashboard && onNavigateToDashboard) {
            onNavigateToDashboard();
        } else if (isVATReconciliation && onNavigateToVATReconciliation) {
            onNavigateToVATReconciliation();
        } else if (isEngagementHub && onNavigateToEngagement) {
            onNavigateToEngagement();
        } else if (isClientProfile && onNavigateToClientProfile) {
            onNavigateToClientProfile(null); // Pass null since we're already viewing a client
        }
    };

    return (
        <div className="w-64 bg-white h-screen flex flex-col fixed left-0 top-0 text-gray-900 shadow-xl z-50 overflow-hidden font-medium">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex-shrink-0">
                <div className="flex items-center justify-center">
                    <img 
                        src="/img/Loginlogo.png" 
                        alt="AICA Logo" 
                        className="h-10 w-auto"
                    />
                </div>
            </div>

            {/* Scrollable Menu Items */}
            <nav className="flex-1 overflow-y-auto py-4 space-y-5 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                {menuSections.map((section, idx) => (
                    <div key={idx}>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-6 mb-3">
                            {section.title}
                        </h4>
                        <div className="space-y-1">
                            {section.items.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleItemClick(item.name, item.isDashboard, item.isVATReconciliation, item.isEngagementHub, item.isClientProfile)}
                                    className={`w-full px-6 py-3 flex items-center gap-3 transition-all text-left ${
                                        activeItem === item.name 
                                            ? 'bg-[#1565C0] text-white' 
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <span className={`flex-shrink-0 ${activeItem === item.name ? 'text-white' : 'text-gray-600'}`}>
                                        {item.icon}
                                    </span>
                                    <span className="text-sm truncate">
                                        {item.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            {/* User Profile Section */}
            <div className="p-4 border-t border-gray-200 flex-shrink-0">
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm">
                    <div className="w-10 h-10 bg-[#1565C0] rounded-lg flex items-center justify-center font-semibold text-sm text-white flex-shrink-0">
                        {user?.name?.split(' ').map(n => n.charAt(0)).join('') || 'A'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs truncate text-gray-900">CA. {user?.name || 'Auditor'}</div>
                        <div className="text-xs text-gray-500 truncate">Partner</div>
                    </div>
                    <button 
                        onClick={onLogout}
                        className="flex-shrink-0 text-gray-500 hover:text-red-600 transition-colors p-1"
                        title="Logout"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidepanel2;
