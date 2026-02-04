import React from 'react';

const CostCalculationBreakdown = () => {
  const vsLastYear = 2.4; // Can be positive or negative
  const isPositive = vsLastYear >= 0;
  
  return (
    <div className="space-y-3">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-md p-4 text-white relative overflow-hidden">
        <div className="absolute right-4 top-4 opacity-20">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v8m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14" />
          </svg>
        </div>
        <h3 className="text-xs font-semibold tracking-wide">CURRENT GROSS PROFIT</h3>
        <div className="text-2xl font-bold mt-2 tabular-nums">NPR 4,125,000</div>
        
        <div className="grid grid-cols-2 gap-3 pt-3 mt-3 border-t border-blue-500">
          <div>
            <p className="text-blue-100 text-[9px] font-semibold mb-0.5">GROSS MARGIN (%)</p>
            <p className="text-lg font-bold">33.13%</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-[9px] font-semibold mb-0.5">VS LAST YEAR</p>
            <div className="flex items-center justify-end gap-1">
              {isPositive ? (
                <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              )}
              <p className={`text-lg font-bold ${isPositive ? 'text-emerald-200' : 'text-red-300'}`}>
                {isPositive ? '+' : ''}{vsLastYear}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-2 border-b border-gray-200">
          <h4 className="text-sm font-bold text-gray-800 tracking-wide">COGS CALCULATION BREAKDOWN</h4>
        </div>
        
        <div className="p-3">
          <div className="space-y-0 divide-y divide-gray-100">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-700 font-medium">Opening Stock (+)</span>
              <span className="text-sm font-semibold text-gray-900 tabular-nums">4,500,000.00</span>
            </div>
            
            <div className="py-2">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-bold text-gray-800">Total Purchases (+)</span>
              </div>
              <div className="bg-gray-50 rounded-md p-2 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 pl-2">• Domestic Purchases</span>
                  <span className="text-xs font-medium text-gray-700 tabular-nums">8,175,000.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 pl-2">• Import Purchases</span>
                  <span className="text-xs font-medium text-gray-700 tabular-nums">8,175,000.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 pl-2">• EXEMPT Purchases</span>
                  <span className="text-xs font-medium text-gray-700 tabular-nums">8,175,000.00</span>
                </div>
                <div className="flex justify-between items-center pt-1.5 mt-1.5 border-t border-gray-300">
                  <span className="text-xs font-bold text-gray-800">Total Purchase (+)</span>
                  <span className="text-xs font-bold text-gray-900 tabular-nums">850,000.00</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-700 font-medium">Less: Direct Expenses (-)</span>
              <span className="text-sm font-semibold text-gray-900 tabular-nums">8,175,000.00</span>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-700 font-medium">Less: Closing Stock (-)</span>
              <span className="text-sm font-semibold text-red-600 tabular-nums">(5,200,000.00)</span>
            </div>
            
            <div className="flex justify-between items-center py-2 bg-blue-50 -mx-3 px-3 mt-1">
              <span className="text-sm font-bold text-blue-900">Total COGS</span>
              <span className="text-base font-bold text-blue-700 tabular-nums">8,325,000.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostCalculationBreakdown;
