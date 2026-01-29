import React, { useState, useRef } from 'react';
import Sidepanel2 from '../../components/layout/Sidepanel2';
import { monthlyVatReconciliationData, vatReconciliationMetrics, reconciliationInsights } from '../../data/monthlyVatReconciliation';
import VATTable from '../../components/ui/VATTable';
import ActionButton from '../../components/ui/ActionButton';
import StatusNotification from '../../components/ui/StatusNotification';
import InfoBanner from '../../components/ui/InfoBanner';
import ExportMenu from '../../components/ui/ExportMenu';
import WorkspaceHeader from '../../components/ui/WorkspaceHeader';
import ScrollIndicator from '../../components/ui/ScrollIndicator';

const MonthlyVATReconciliationPage = ({ user, selectedClient, onLogout, onNavigateToDashboard, onNavigateToEngagement }) => {
    const [showExitConfirm, setShowExitConfirm] = useState(false);
    const [showSaveProgressConfirm, setShowSaveProgressConfirm] = useState(false);
    const [saveState, setSaveState] = useState('default'); // 'default', 'loading', 'success'
    const [mapGrossRevenueState, setMapGrossRevenueState] = useState('default'); // 'default', 'loading', 'success'
    const [saveProgressState, setSaveProgressState] = useState('default'); // 'default', 'loading', 'success'
    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
    const [isMapped, setIsMapped] = useState(false);
    const [isProgressSaved, setIsProgressSaved] = useState(false);
    const [showExportMenu, setShowExportMenu] = useState(false);
    const mainContentRef = useRef(null);

    // Use selectedClient if available, otherwise use default data
    const clientData = selectedClient || { name: 'Default Client', pan: 'N/A' };

    // Format currency
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-NP', {
            style: 'currency',
            currency: 'NPR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    // Handle Save Progress
    const handleSaveProgress = () => {
        setShowSaveProgressConfirm(true);
    };

    // Confirm Save Progress
    const handleConfirmSaveProgress = async () => {
        setShowSaveProgressConfirm(false);
        setSaveProgressState('loading');
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            setSaveProgressState('success');
            setIsProgressSaved(true);
            setNotification({
                show: true,
                message: 'Progress mapped to Gross Revenue successfully',
                type: 'success',
            });
        } catch (error) {
            console.error('Save error:', error);
            setNotification({
                show: true,
                message: 'Failed to save progress',
                type: 'error',
            });
            setSaveProgressState('default');
        }
    };

    // Handle Save Changes
    const handleSaveChanges = async () => {
        setSaveState('loading');
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            setSaveState('success');
            setNotification({
                show: true,
                message: 'VAT reconciliation data saved successfully',
                type: 'success',
            });
            
            // Reset to default after 3 seconds
            setTimeout(() => {
                setSaveState('default');
            }, 3000);
        } catch (error) {
            console.error('Save error:', error);
            setNotification({
                show: true,
                message: 'Failed to save changes',
                type: 'error',
            });
            setSaveState('default');
        }
    };

    // Handle Map Gross Revenue
    const handleMapGrossRevenue = async () => {
        setMapGrossRevenueState('loading');
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2500));
            setMapGrossRevenueState('success');
            setIsMapped(true);
            setNotification({
                show: true,
                message: 'Data successfully mapped to Gross Revenue',
                type: 'success',
            });

            // Reset to default after 3 seconds
            setTimeout(() => {
                setMapGrossRevenueState('default');
            }, 3000);
        } catch (error) {
            console.error('Map error:', error);
            setNotification({
                show: true,
                message: 'Failed to map data to Gross Revenue',
                type: 'error',
            });
            setMapGrossRevenueState('default');
        }
    };

    // Handle Exit Workspace
    const handleExitWorkspace = () => {
        setShowExitConfirm(true);
    };

    // Confirm exit
    const handleConfirmExit = async () => {
        // Perform any cleanup or final save if needed
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Then navigate back or logout
        if (onNavigateToDashboard) {
            onNavigateToDashboard();
        }
    };

    // Export to Excel handler
    const handleExportExcel = () => {
        setNotification({
            show: true,
            message: 'Exporting data to Excel...',
            type: 'info',
        });
        // Implement actual export logic
    };

    // Export to PDF handler
    const handleExportPDF = () => {
        setNotification({
            show: true,
            message: 'Exporting data to PDF...',
            type: 'info',
        });
        // Implement actual export logic
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <Sidepanel2 user={user} onLogout={onLogout} activeItem="Monthly VAT Reconciliation" onNavigateToDashboard={onNavigateToDashboard} onNavigateToEngagement={() => onNavigateToEngagement(selectedClient)} selectedClient={selectedClient} />

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

                {/* Header Details */}
                <div className="bg-white border-b border-gray-200 px-8 py-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Monthly VAT vs Ledger Comparison</h1>
                            <p className="text-sm text-gray-600 mt-1">Comparison of Sales and VAT, Stability for Fiscal Year</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <ActionButton
                                    variant="secondary"
                                    size="medium"
                                    onClick={() => setShowExportMenu(!showExportMenu)}
                                    className="flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                                    </svg>
                                    Export Analysis
                                </ActionButton>
                                <ExportMenu isOpen={showExportMenu} onClose={() => setShowExportMenu(false)} />
                            </div>
                            <ActionButton
                                variant="primary"
                                size="medium"
                                state={saveState}
                                onClick={handleSaveChanges}
                                className="flex items-center gap-2"
                            >
                                {saveState === 'success' ? 'Saved Changes' : 'Save Changes'}
                            </ActionButton>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto hide-scrollbar" ref={mainContentRef}>
                    <div className="p-8 space-y-6">
                        {/* VAT Table - Full Width */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
                            <VATTable data={monthlyVatReconciliationData} />
                        </div>

                        {/* Info Banners - Horizontal Layout */}
                        <div className="grid grid-cols-2 gap-4">
                            {reconciliationInsights.discrepancies.length > 0 && (
                                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex gap-3">
                                    <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold text-orange-900">Reconciliation Insight</p>
                                        <p className="text-sm text-orange-800 mt-1">There is a total VAT mismatch of ₹ 1,625.00 for the period. Most of this stems from the month of Ashwin. Please verify if any invoices were recorded in the ledger but omitted in the VAT return or vice versa.</p>
                                    </div>
                                </div>
                            )}

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <div>
                                    <p className="font-semibold text-blue-900">Sync Information</p>
                                    <p className="text-sm text-blue-800 mt-1">Last sync with ISD Portal: <span className="font-bold">2080-10-15-14:30</span>. Click the sync button at the top to fetch latest filing data. Manual changes to 'VAT Return' columns will be highlighted.</p>
                                </div>
                            </div>
                        </div>

                        {/* Separator Line */}
                        <div className="border-t border-gray-200"></div>

                        </div>

                        {/* Financial Statements Section */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <div className="flex items-center justify-end gap-4">
                                <p className="text-sm text-gray-600">Review mismatches before posting. Reconciled totals will map to Sales/Purchase accounts in the Financial Summary.</p>
                                <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-lg text-slate-700 flex items-center gap-2 font-medium shadow-sm hover:bg-gray-50">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16v4H7v-4m10-4H7m10-4H7m10-4H7m10-4H7" />
                                    </svg>
                                    Save Progress
                                </button>
                                <div className="relative flex-shrink-0">
                                    {isProgressSaved ? (
                                        <button
                                            disabled
                                            className="px-6 py-2.5 bg-green-600 rounded-lg text-white flex items-center gap-2 font-medium shadow-sm"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Mapped to Gross Revenue
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleSaveProgress}
                                            disabled={saveProgressState === 'loading'}
                                            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 rounded-lg text-white flex items-center gap-2 font-medium transition-colors shadow-sm disabled:opacity-50"
                                        >
                                            {saveProgressState === 'loading' ? (
                                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            )}
                                            Confirm & Map to Gross Revenue
                                        </button>
                                    )}
                                    
                                    {/* Confirmation Popup */}
                                    {showSaveProgressConfirm && (
                                        <div className="absolute bottom-full mb-2 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
                                            <div className="flex items-start gap-3">
                                                <div className="flex-shrink-0">
                                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Confirm & Map to Gross Revenue</h3>
                                                    <p className="text-xs text-gray-600 mb-3">Do you want to save and map this reconciliation to Gross Revenue in Financial Summary?</p>
                                                    <div className="flex gap-2 justify-end">
                                                        <button
                                                            onClick={() => setShowSaveProgressConfirm(false)}
                                                            className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            onClick={handleConfirmSaveProgress}
                                                            className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                                                        >
                                                            Confirm
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Down Indicator */}
                <ScrollIndicator targetRef={mainContentRef} />
            </div>

            {/* Notifications */}
            <StatusNotification
                type={notification.type}
                message={notification.message}
                show={notification.show}
                autoClose={true}
                duration={3000}
            />
        </div>
    );
};

export default MonthlyVATReconciliationPage;
