import React from 'react';

const SidePanel = ({ activeItem = 'Client Portfolio', user }) => {
    const menuItems = [
        { 
            id: 1, 
            name: 'Client Portfolio', 
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                </svg>
            )
        },
        { 
            id: 2, 
            name: 'Engagements', 
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        { 
            id: 3, 
            name: 'Staffing', 
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
    ];

    return (
        <div className="w-64 bg-[#1565C0] h-screen flex flex-col fixed left-0 top-0 text-white shadow-xl">
            {/* Header */}
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-center">
                    <img 
                        src="/img/logo1.png" 
                        alt="AICA Logo" 
                        className="h-10 w-auto"
                    />
                </div>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 py-4">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        className={`w-full px-6 py-3.5 flex items-center gap-3 hover:bg-white/10 transition-all ${
                            activeItem === item.name ? 'bg-white/15' : ''
                        }`}
                    >
                        {item.icon}
                        <span className="font-medium text-sm">{item.name}</span>
                    </button>
                ))}
            </nav>

            {/* User Profile */}
            <div className="p-6 border-t border-white/10">
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-lg">
                    <div className="w-14 h-14 bg-orange-400/90 rounded-xl flex items-center justify-center font-semibold text-lg border-2 border-white/30 shadow-md">
                        {user?.name?.split(' ').map(n => n.charAt(0)).join('') || 'A'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-semibold text-base truncate">CA. {user?.name || 'Auditor'}</div>
                        <div className="text-sm text-white/70 truncate">Partner</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidePanel;
