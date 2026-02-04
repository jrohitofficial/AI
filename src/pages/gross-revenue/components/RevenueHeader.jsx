import React from 'react';

const RevenueHeader = ({ client }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-3">
      <div className="flex items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Input Summary</h1>
          <p className="text-sm text-gray-600 mt-0.5">FY 2080/081 Audit Preparation • IRD Nepal Standards</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Last saved: 10:45 AM Today</span>
          <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors shadow-sm">
            Export to P&amp;L
          </button>
        </div>
      </div>
    </div>
  );
};

export default RevenueHeader;
