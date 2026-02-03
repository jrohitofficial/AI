import React, { useRef, useState } from 'react';
import Sidepanel2 from '../../components/layout/Sidepanel2';
import WorkspaceHeader from '../../components/ui/WorkspaceHeader';
import ScrollIndicator from '../../components/ui/ScrollIndicator';
import { clientProfileData } from '../../data/clientProfile';
import {
  ClientHeader,
  TabNavigation,
  MetricCard,
  ClientInfoSection,
  RecentInvoicesList,
  NotesSection,
  CreditUsageCard,
  FinancialDetailsSection,
  AddressesSection,
  TransactionsTable,
  ContactsTable,
  DocumentsTable,
  ActivityTimeline
} from './';

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
  const client = selectedClient || clientProfileData;
  const scrollContainerRef = useRef(null);

  const tabs = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h7m-7 6h7m-7 6h7m2-12h7m-7 6h7m-7 6h7" />
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2zm2 4h6m-6 3h4" />
        </svg>
      )
    },
    { 
      id: 'documents', 
      label: 'Documents', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4h7l5 5v11a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2zm7 0v5h5M9 13h6m-6 4h6" />
        </svg>
      )
    },
    { 
      id: 'activity', 
      label: 'Activity', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h4l2-5 4 10 2-5h6" />
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
        <ClientHeader client={client} />

        {/* Tabs */}
        <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto hide-scrollbar" ref={scrollContainerRef}>
          <main className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                {/* Metrics + Recent Invoices */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <MetricCard
                        label="Total Revenue"
                        value="Rs12,00,000"
                        subtitle="+6.1% from last year"
                        icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        iconBgColor="bg-green-100"
                        iconColor="text-green-600"
                      />
                      <MetricCard
                        label="Outstanding"
                        value="Rs24,750"
                        subtitle="3 invoices overdue"
                        icon="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        iconBgColor="bg-orange-100"
                        iconColor="text-orange-600"
                      />
                      <MetricCard
                        label="Total Orders"
                        value="600+"
                        subtitle="1% This Quarter"
                        icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        iconBgColor="bg-blue-100"
                        iconColor="text-blue-600"
                      />
                    </div>
                    <ClientInfoSection client={client} />
                    <FinancialDetailsSection client={client} />
                    <AddressesSection client={client} />
                  </div>
                  <div className="sticky top-6 self-start space-y-3">
                    <RecentInvoicesList invoices={client.recentInvoices} />
                    <NotesSection />
                    <CreditUsageCard />
                  </div>
                </div>
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div className="space-y-4">
                <TransactionsTable transactions={client.transactions} />
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div className="space-y-4">
                <ContactsTable contacts={client.contacts} />
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-4">
                <DocumentsTable documents={client.documents} />
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="space-y-4">
                <ActivityTimeline />
              </div>
            )}
          </main>

          <ScrollIndicator targetRef={scrollContainerRef} />
        </div>
      </div>
    </div>
  );
};

export default ClientProfilePage;
