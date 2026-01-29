import React from 'react';
import ActionButton from './ActionButton';

const WorkspaceHeader = ({ 
    clientData, 
    onNavigateToDashboard, 
    showExitConfirm, 
    onExitWorkspace, 
    onConfirmExit, 
    onCancelExit 
}) => {
    const formatTime = () => {
        return new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            hour12: false 
        });
    };

    return (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
            <div className="px-8 py-4">
                <div className="flex items-center justify-between">
                    {/* Breadcrumb and Client Info */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm">
                            <span 
                                onClick={onNavigateToDashboard} 
                                className="text-gray-600 hover:text-gray-900 cursor-pointer font-['Inter',sans-serif] transition-colors"
                            >
                                Clients
                            </span>
                            <span className="text-gray-400">›</span>
                            <span className="text-gray-900 font-semibold font-['Inter',sans-serif]">
                                {clientData?.name || 'Default Client'}
                            </span>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded font-['Inter',sans-serif]">
                            FY 2060/61
                        </span>
                    </div>

                    {/* Right Side - Timer and Button */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium font-['Inter',sans-serif]">{formatTime()}</span>
                        </div>
                        <div className="relative">
                            <ActionButton
                                variant="secondary"
                                size="medium"
                                onClick={onExitWorkspace}
                                className="bg-slate-800 hover:bg-slate-900 text-white flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                </svg>
                                Save & Exit Workspace
                            </ActionButton>
                            
                            {/* Exit Confirmation Popup */}
                            {showExitConfirm && (
                                <div className="absolute top-full mt-2 right-0 w-96 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0">
                                            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-semibold text-gray-900 mb-1">Exit Workspace</h3>
                                            <p className="text-xs text-gray-600 mb-3">Are you sure you want to exit the workspace? Make sure all your changes are saved.</p>
                                            <div className="flex gap-2 justify-end">
                                                <button
                                                    onClick={onConfirmExit}
                                                    className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700"
                                                >
                                                    Yes, Proceed
                                                </button>
                                                <button
                                                    onClick={onCancelExit}
                                                    className="px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700"
                                                >
                                                    No, I will stay
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
    );
};

export default WorkspaceHeader;
