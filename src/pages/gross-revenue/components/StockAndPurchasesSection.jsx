import React from 'react';

const StockAndPurchasesSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-semibold text-teal-600 tracking-wider">STOCK &amp; PURCHASES</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-3">
        {/* Opening Stock */}
        <div className="border-b border-gray-100 pb-3">
          <label className="text-xs font-semibold text-gray-700">Opening Stock (as per Balance Sheet)</label>
          <div className="mt-1.5">
            <input 
              type="text" 
              placeholder="NPR"
              defaultValue="4,500,000.00"
              className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-gray-900 font-semibold bg-gray-50 text-sm"
            />
          </div>
        </div>

        {/* Domestic Purchases */}
        <div className="grid grid-cols-2 gap-3 border-b border-gray-100 pb-3">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1.5">Domestic Purchases</label>
            <input 
              type="text" 
              placeholder="0.00"
              className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-gray-900 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1.5">Import Purchases</label>
            <input 
              type="text" 
              placeholder="0.00"
              className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-gray-900 text-sm"
            />
          </div>
        </div>

        {/* EXEMPT Purchase */}
        <div className="border-b border-gray-100 pb-3">
          <label className="text-xs font-semibold text-gray-700 block mb-1.5">EXEMPT Purchase</label>
          <input 
            type="text" 
            placeholder="0.00"
            defaultValue="125,000.00"
            className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-gray-900 text-sm"
          />
        </div>

        {/* Purchase Returns */}
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1.5">Purchase Returns</label>
          <input 
            type="text" 
            placeholder="0.00"
            defaultValue="(125,000.00)"
            className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-red-600 font-semibold text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default StockAndPurchasesSection;
