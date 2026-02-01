import React, { useState } from 'react';
import Sidepanel2 from '../../components/layout/Sidepanel2';
import WorkspaceHeader from '../../components/ui/WorkspaceHeader';
import ScrollIndicator from '../../components/ui/ScrollIndicator';
import { clientProfileData } from '../../data/clientProfile';

const ClientProfilePage = ({ 
  user, 
  selectedClient, 
  onLogout, 
  onNavigateToDashboard, 
  onNavigateToEngagement,
  onNavigateToVATReconciliation,
  onNavigateToClientProfile 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const client = selectedClient || clientProfileData;

  const tabs = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    { 
      id: 'transactions', 
      label: 'Transactions', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      id: 'contacts', 
      label: 'Contacts', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      id: 'documents', 
      label: 'Documents', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      id: 'activity', 
      label: 'Activity', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidepanel2 
        activeItem="Client Profile"
        user={user}
        onLogout={onLogout}
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToEngagement={onNavigateToEngagement}
        onNavigateToVATReconciliation={onNavigateToVATReconciliation}
        onNavigateToClientProfile={onNavigateToClientProfile}
      />

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col overflow-hidden">
        {/* Header */}
        <WorkspaceHeader 
          onNavigateToDashboard={onNavigateToDashboard}
          clientData={client}
        />

        {/* Client Profile Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{client.companyName}</h1>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold uppercase">
                    {client.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mb-4">Client ID: {client.clientId}</div>
                <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {client.email}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {client.phone}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    {client.website}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Kathmandu, Nepal
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                Edit Profile
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200 px-8">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-1 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <main className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Metrics Cards */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
                        <div className="text-2xl font-bold text-gray-900">Rs12,00,000</div>
                        <div className="text-xs text-green-600 mt-1">+6.1% from last year</div>
                      </div>
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Outstanding</div>
                        <div className="text-2xl font-bold text-gray-900">Rs24,750</div>
                        <div className="text-xs text-gray-500 mt-1">3 invoices overdue</div>
                      </div>
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Total Orders</div>
                        <div className="text-2xl font-bold text-gray-900">600+</div>
                        <div className="text-xs text-gray-500 mt-1">1% This Quarter</div>
                      </div>
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Client Information */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-2 bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Client Information</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Industry type</div>
                        <div className="text-sm font-medium text-gray-900">{client.industry}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Company Name</div>
                        <div className="text-sm font-medium text-gray-900">{client.companyName}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Tax ID</div>
                        <div className="text-sm font-medium text-gray-900">{client.taxId}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Company Size</div>
                        <div className="text-sm font-medium text-gray-900">{client.companySize}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Account Manager</div>
                        <div className="text-sm font-medium text-gray-900">{client.accountManager}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Client Since</div>
                        <div className="text-sm font-medium text-gray-900">{client.clientSince}</div>
                      </div>
                    </div>
                    <button className="mt-6 text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View all Resources →
                    </button>
                  </div>

                  {/* Recent Invoices + Notes */}
                  <div className="space-y-6">
                    {/* Recent Invoices */}
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Invoices</h3>
                      <div className="space-y-3">
                        {client.recentInvoices?.map((invoice, idx) => (
                          <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                            <div>
                              <div className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">{invoice.id}</div>
                              <div className="text-xs text-gray-500">{invoice.date}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-gray-900">{invoice.amount}</div>
                              <div className={`text-xs font-semibold ${invoice.status === 'Paid' ? 'text-green-600' : 'text-orange-600'}`}>{invoice.status}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Notes</h3>
                      <div className="space-y-3">
                        <div className="bg-blue-50 rounded p-3 border-l-4 border-blue-500">
                          <div className="text-sm text-gray-900">Requires LC for orders above Rs60k</div>
                          <div className="text-xs text-gray-500 mt-1">Added by Rajaesh K · Jan 20 2026</div>
                        </div>
                        <div className="bg-blue-50 rounded p-3 border-l-4 border-blue-500">
                          <div className="text-sm text-gray-900">Requires LC for orders above Rs60k</div>
                          <div className="text-xs text-gray-500 mt-1">Added by Rajaesh K · Jan 20 2026</div>
                        </div>
                      </div>
                      <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                        + Add Note
                      </button>
                    </div>

                    {/* Credit Uses */}
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Credit Uses</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Used</span>
                            <span className="text-sm font-bold text-gray-900">Rs 24,750</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{width: '50%'}}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Limit</span>
                            <span className="text-sm font-bold text-gray-900">Rs 125,000</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-orange-400 h-2 rounded-full" style={{width: '25%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Details */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Financial Details</h3>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Credit limit</div>
                      <div className="text-sm font-medium text-gray-900">Rs 150,000</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Available Credit</div>
                      <div className="text-sm font-medium text-gray-900">Rs 150,000</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Payment Terms</div>
                      <div className="text-sm font-medium text-gray-900">Net 45</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Payment Method</div>
                      <div className="text-sm font-medium text-gray-900">Wire Transfer</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Currency</div>
                      <div className="text-sm font-medium text-gray-900">Nepalese</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Discount Rate</div>
                      <div className="text-sm font-medium text-gray-900">8%</div>
                    </div>
                  </div>
                </div>

                {/* Addresses */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Addresses</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm font-medium text-gray-900 mb-2">Billing Address</div>
                      <div className="text-sm text-gray-600">Everest Trading Company Limited</div>
                      <div className="text-sm text-gray-600">Lazimpat Road, Maharajgun</div>
                      <div className="text-sm text-gray-600">Kathmandu 44600</div>
                      <div className="text-sm text-gray-600">Nepal</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 mb-2">Shipping Address</div>
                      <div className="text-sm text-gray-600">Everest Logistic Center</div>
                      <div className="text-sm text-gray-600">Industrial District, Balaju</div>
                      <div className="text-sm text-gray-600">Kathmandu 44616</div>
                      <div className="text-sm text-gray-600">Nepal</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Transactions</h2>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                        Filter
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setShowExportMenu(!showExportMenu)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                          Export
                        </button>
                        {showExportMenu && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                              <span>Export in Excel</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </button>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                              <span>Export in PDF</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">Total Invoice</div>
                      <div className="text-2xl font-bold text-gray-900">RS1200,000.00</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">Total Paid</div>
                      <div className="text-2xl font-bold text-green-600">RS1200,000.00</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">Total Outstanding</div>
                      <div className="text-2xl font-bold text-orange-600">RS1200,000.00</div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4">
                      <div className="text-xs text-gray-600 mb-1">Overdue</div>
                      <div className="text-2xl font-bold text-red-600">RS1200,000.00</div>
                    </div>
                  </div>

                  {/* Transactions Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Transaction ID</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Description</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...Array(8)].map((_, idx) => (
                          <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm text-blue-600">INV-{1045 + idx}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">Jan 25, 2026</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{idx % 2 === 0 ? 'Invoice' : 'Payment'}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">Q1 Software Licence</td>
                            <td className="py-3 px-4 text-sm text-gray-900 font-medium">Rs8,500</td>
                            <td className="py-3 px-4">
                              <span className={`text-xs font-semibold px-2 py-1 rounded ${
                                idx % 3 === 0 ? 'bg-green-100 text-green-700' : idx % 3 === 1 ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                              }`}>
                                {idx % 3 === 0 ? 'Paid' : idx % 3 === 1 ? 'Completed' : 'Overdue'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-600">Showing 1 of 2222 transactions</span>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Previous</button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Next</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Contact Persons</h2>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Clients
                    </button>
                  </div>

                  {/* Contact Cards */}
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    {[...Array(6)].map((_, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-blue-600">JS</span>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded transition">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10.5 1.5H5.75A4.25 4.25 0 001.5 5.75v8.5A4.25 4.25 0 005.75 18.5h8.5a4.25 4.25 0 004.25-4.25v-4.75M6.5 6.5h7M6.5 10h7" />
                            </svg>
                          </button>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">John Smithe</h3>
                        <div className="inline-block text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium mb-3">Primary</div>
                        <div className="text-xs text-gray-600 font-medium mb-1">CEO</div>
                        <div className="text-xs text-blue-600 mb-1 cursor-pointer hover:underline">Everest@trading.com</div>
                        <div className="text-xs text-gray-600">+977(1)4567-890</div>
                      </div>
                    ))}
                  </div>

                  {/* Contacts Table */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">See All Contacts</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Role</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Department</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Phone</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...Array(8)].map((_, idx) => (
                            <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-700">
                                    R
                                  </div>
                                  <span className="text-sm text-gray-900">Rohit Jha</span>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-sm text-gray-600">Managing Director</td>
                              <td className="py-3 px-4 text-sm text-gray-600">Executive</td>
                              <td className="py-3 px-4 text-sm text-blue-600">Rjhot2@gmail.com</td>
                              <td className="py-3 px-4 text-sm text-gray-600">+977-9803391234</td>
                              <td className="py-3 px-4 text-sm text-blue-600 cursor-pointer hover:underline">Edit</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button className="mt-4 text-sm text-gray-600 hover:text-gray-900 font-medium">View More...</button>
                  </div>
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Documents</h2>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search"
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 100 2h14a1 1 0 100-2H3zM3 9a1 1 0 100 2h14a1 1 0 100-2H3z" />
                        </svg>
                        Filter
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Upload Documents
                      </button>
                    </div>
                  </div>

                  {/* Document Stats */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Contacts</div>
                          <div className="text-2xl font-bold text-gray-900">1200</div>
                        </div>
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Invoices</div>
                          <div className="text-2xl font-bold text-gray-900">500</div>
                        </div>
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-6 3v-3m-6-4h18a2 2 0 012 2v12a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Reports</div>
                          <div className="text-2xl font-bold text-gray-900">1231</div>
                        </div>
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-gray-600 mb-1">Others</div>
                          <div className="text-2xl font-bold text-gray-900">100+</div>
                        </div>
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Documents Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Document Type</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Size</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Uploaded By</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...Array(8)].map((_, idx) => (
                          <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                  </svg>
                                </div>
                                <span className="text-sm text-gray-900">Service Agreement 2016.pdf</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">Contract</td>
                            <td className="py-3 px-4 text-sm text-gray-600">2.5 MB</td>
                            <td className="py-3 px-4 text-sm text-gray-600">Rohit Jha</td>
                            <td className="py-3 px-4 text-sm text-gray-600">Jan 21, 2025</td>
                            <td className="py-3 px-4">
                              <button className="text-gray-400 hover:text-gray-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-600">Showing 1 of 2222 Transaction</span>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Previous</button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Next</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-gray-900 mb-6">Activity Timeline</h2>
                  <div className="space-y-6">
                    {[
                      { title: 'Payment Received', desc: 'Payment of Rs8,500 received for Invoice-IH by Kohli', status: 'Completed' },
                      { title: 'Invoice Generated', desc: 'Invoice for Q1 Software License of Software License', status: 'Completed' },
                      { title: 'Email Sent', desc: 'Quarterly advance sent to john.smith@invoice.com', status: 'Completed' },
                      { title: 'Phone Call', desc: 'Follow-up call regarding overdue invoice Invoice-1039', status: 'Completed' },
                      { title: 'Payment Received', desc: 'Payment of Rs8,500 received for Invoice-IH by Kohli', status: 'Completed' },
                      { title: 'Document Uploaded', desc: 'Service Agreement 2016.pdf is uploaded', status: 'Completed' },
                      { title: 'Contact Updated', desc: 'Contact information updated for more Johnn', status: 'Completed' },
                      { title: 'Profile Updated', desc: 'Client company info profile updated to address', status: 'Completed' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            idx === 0 ? 'bg-green-100' : idx === 1 ? 'bg-blue-100' : idx === 2 ? 'bg-pink-100' : idx === 3 ? 'bg-orange-100' : 'bg-green-100'
                          }`}>
                            {idx === 0 && <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
                            {idx === 1 && <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000-2H6a4 4 0 00-4 4v10a1 1 0 001 1h1a1 1 0 100-2H5V5z" clipRule="evenodd" /></svg>}
                            {idx === 2 && <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>}
                            {idx === 3 && <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.79l.291 1.991a1 1 0 00.929.79h1.164a1 1 0 00.929-.79l.291-1.991A1 1 0 0110.847 2H13a1 1 0 011 1v2a1 1 0 11-2 0V4h-2v2a1 1 0 11-2 0V4H5v1a1 1 0 11-2 0V3z" /></svg>}
                            {idx === 4 && <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
                            {idx === 5 && <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4z" /></svg>}
                            {idx === 6 && <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" /></svg>}
                            {idx === 7 && <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>}
                          </div>
                          {idx < 7 && <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>}
                        </div>
                        <div className="flex-1 pb-4">
                          <h4 className="font-semibold text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                            <span>3 days ago</span>
                            <span>•</span>
                            <span>System</span>
                          </div>
                          <span className={`inline-block mt-2 text-xs font-semibold px-2 py-1 rounded ${
                            item.status === 'Completed' ? 'bg-green-100 text-green-700' : ''
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </main>

          <ScrollIndicator targetRef={null} />
        </div>
      </div>
    </div>
  );
};

export default ClientProfilePage;
