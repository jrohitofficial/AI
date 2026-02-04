import React from 'react';

const RevenueAndInventorySection = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h2 className="text-xs font-semibold text-teal-600 tracking-wider mb-3">REVENUE &amp; INVENTORY</h2>
      
      <div className="space-y-3">
        {/* Gross Sales */}
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1.5">Gross Sales</label>
          <input 
            type="text" 
            placeholder="0.00"
            defaultValue="12,450,000.00"
            className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-gray-900 font-semibold text-sm"
          />
        </div>

        {/* Other Incomes */}
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1.5">Other Incomes</label>
          <input 
            type="text" 
            placeholder="0.00"
            className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-gray-900 text-sm"
          />
        </div>

        {/* Sales Returns and EXEMPT Sales - 2 Column */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1.5">Sales Returns</label>
            <input 
              type="text" 
              placeholder="0.00"
              className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-gray-900 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1.5">EXEMPT Sales</label>
            <input 
              type="text" 
              placeholder="0.00"
              defaultValue="5,200,000.00"
              className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-gray-900 font-semibold text-sm"
            />
          </div>
        </div>

        {/* Closing Stock */}
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1.5">Closing Stock</label>
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

export default RevenueAndInventorySection;
