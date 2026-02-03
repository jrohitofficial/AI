import React from 'react';

const CreditUsageCard = ({ used = 'Rs 24,750', limit = 'Rs 125,000' }) => {
  const usedAmount = parseInt(used.replace(/[^0-9]/g, ''));
  const limitAmount = parseInt(limit.replace(/[^0-9]/g, ''));
  const percentageUsed = Math.round((usedAmount / limitAmount) * 100);
  const percentageAvailable = 100 - percentageUsed;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Credit Usage
      </h3>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
            <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">Used</div>
            <div className="text-2xl font-bold text-amber-600">{used}</div>
            <div className="text-xs text-gray-500 mt-1">{percentageUsed}% of limit</div>
          </div>
          <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
            <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1">Limit</div>
            <div className="text-2xl font-bold text-emerald-600">{limit}</div>
            <div className="text-xs text-gray-500 mt-1">Total available</div>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-amber-400 to-amber-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${percentageUsed}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span className="font-semibold">Available: Rs {limit && used ? (limitAmount - usedAmount).toLocaleString('en-IN') : '-'}</span>
          <span className="font-semibold text-emerald-600">{percentageAvailable}% remaining</span>
        </div>
      </div>
    </div>
  );
};

export default CreditUsageCard;