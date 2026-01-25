import React, { useState, useRef, useEffect } from 'react';

const Navbar = ({ user, onLogout, searchQuery = '', onSearchChange, clients = [] }) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const menuRef = useRef(null);
    const searchRef = useRef(null);

    // Filter clients based on search query
    const filteredClients = searchQuery.trim() ? clients.filter(client => {
        const query = searchQuery.toLowerCase();
        return (
            client.name.toLowerCase().includes(query) ||
            client.pan.toLowerCase().includes(query) ||
            client.sector.toLowerCase().includes(query)
        );
    }) : [];

    // Close menus when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchDropdown(false);
            }
        };

        if (showProfileMenu || showSearchDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showProfileMenu, showSearchDropdown]);

    // Show dropdown when searching
    useEffect(() => {
        if (searchQuery.trim()) {
            setShowSearchDropdown(true);
        } else {
            setShowSearchDropdown(false);
        }
    }, [searchQuery]);

    const handleLogout = () => {
        setShowProfileMenu(false);
        if (onLogout) {
            onLogout();
        }
    };

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="px-8 py-4 flex items-center justify-between">
                {/* Search Bar */}
                <div className="flex-1 max-w-md">
                    <div className="relative" ref={searchRef}>
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search clients or PAN..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                            onFocus={() => searchQuery.trim() && setShowSearchDropdown(true)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm"
                        />
                        
                        {/* Search Results Dropdown */}
                        {showSearchDropdown && searchQuery.trim() && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                                {filteredClients.length > 0 ? (
                                    <div className="py-2">
                                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                                            Found {filteredClients.length} client{filteredClients.length !== 1 ? 's' : ''}
                                        </div>
                                        {filteredClients.map(client => (
                                            <button
                                                key={client.id}
                                                onClick={() => {
                                                    setShowSearchDropdown(false);
                                                    onSearchChange && onSearchChange('');
                                                }}
                                                className="w-full px-4 py-3 hover:bg-blue-50 transition-colors text-left border-b border-gray-100 last:border-0"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <img src={client.icon} alt={client.name} className="w-6 h-6" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-medium text-gray-900 text-sm truncate">{client.name}</div>
                                                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                                            <span className="flex items-center gap-1">
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                </svg>
                                                                {client.pan}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                                </svg>
                                                                {client.sector}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                        client.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                                                        client.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                        {client.status}
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="px-4 py-8 text-center text-gray-500">
                                        <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-sm font-medium">No clients found</p>
                                        <p className="text-xs mt-1">Try searching with a different keyword</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right side - Notifications and Profile */}
                <div className="flex items-center gap-6 ml-8">
                    {/* Notification Bell */}
                    <button className="relative text-gray-600 hover:text-gray-900 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* User Profile Avatar with Dropdown */}
                    <div className="flex items-center gap-2 pl-6 border-l border-gray-200 relative" ref={menuRef}>
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="cursor-pointer focus:outline-none"
                            title="Profile"
                        >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold hover:shadow-md transition-shadow focus:ring-2 focus:ring-blue-300">
                                {user?.initial || user?.name?.[0]?.toUpperCase() || 'A'}
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        {showProfileMenu && (
                            <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                {/* User Info */}
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm font-semibold text-gray-900">
                                        {user?.name || 'User'}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {user?.email || 'user@example.com'}
                                    </p>
                                </div>

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
