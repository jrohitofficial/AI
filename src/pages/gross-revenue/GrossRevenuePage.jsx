import React, { useRef } from 'react';
import Sidepanel2 from '../../components/layout/Sidepanel2';
import WorkspaceHeader from '../../components/ui/WorkspaceHeader';
import ScrollIndicator from '../../components/ui/ScrollIndicator';
import {
  RevenueHeader,
  StockAndPurchasesSection,
  DirectExpensesSection,
  RevenueAndInventorySection,
  CostCalculationBreakdown,
  ComplianceAlert
} from './';

const GrossRevenuePage = ({ 
  user, 
  selectedClient, 
  onLogout, 
  onNavigateToDashboard, 
  onNavigateToEngagement,
  onNavigateToVATReconciliation,
  onNavigateToClientProfile,
  onNavigateToGrossRevenue
}) => {
  const scrollContainerRef = useRef(null);

  const clientData = selectedClient || { name: 'Everest Trading Co. Ltd', pan: 'PAN: 302456789' };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidepanel2 
        activeItem="Gross Revenue"
        user={user}
        onLogout={onLogout}
        onNavigateToDashboard={onNavigateToDashboard}
        onNavigateToEngagement={onNavigateToEngagement}
        onNavigateToVATReconciliation={onNavigateToVATReconciliation}
        onNavigateToClientProfile={onNavigateToClientProfile}
        onNavigateToGrossRevenue={onNavigateToGrossRevenue}
      />

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col overflow-hidden">
        {/* Header */}
        <WorkspaceHeader 
          onNavigateToDashboard={onNavigateToDashboard}
          clientData={clientData}
        />

        {/* Revenue Header */}
        <RevenueHeader client={clientData} />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto hide-scrollbar" ref={scrollContainerRef}>
          <main className="p-8">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {/* Left Column (2/3) */}
                <div className="col-span-2 space-y-4">
                  <StockAndPurchasesSection />
                  <DirectExpensesSection />
                  <RevenueAndInventorySection />
                </div>

                {/* Right Column (1/3) */}
                <div className="sticky top-6 self-start space-y-4">
                  <CostCalculationBreakdown />
                  <ComplianceAlert />
                </div>
              </div>
            </div>
          </main>

          <ScrollIndicator targetRef={scrollContainerRef} />
        </div>
      </div>
    </div>
  );
};

export default GrossRevenuePage;
