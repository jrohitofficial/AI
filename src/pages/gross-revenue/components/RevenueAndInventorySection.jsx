import React, { useState } from 'react';

const RevenueAndInventorySection = ({ onChange, grossSales = '0.00', onOtherIncomesChange, onSalesReturnsChange, onExemptSalesChange }) => {
  const [closingStock, setClosingStock] = useState('0.00');
  const [otherIncomes, setOtherIncomes] = useState('0.00');
  const [salesReturns, setSalesReturns] = useState('0.00');
  const [exemptSales, setExemptSales] = useState('0.00');

  // Helper function to format numbers with commas
  const formatNumberWithCommas = (value) => {
    if (!value) return '';
    // Remove all non-numeric characters except decimal point
    const cleaned = value.replace(/[^0-9.]/g, '');
    // Split by decimal
    const parts = cleaned.split('.');
    // Format the integer part with commas
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // Rejoin
    return parts.join('.');
  };

  const handleClosingStockChange = (value) => {
    // Remove parentheses and any non-numeric characters except commas and dots
    const cleanValue = value.replace(/[()]/g, '');
    const formatted = formatNumberWithCommas(cleanValue);
    setClosingStock(formatted);
    if (onChange) {
      onChange(formatted);
    }
  };

  const handleOtherIncomesChange = (value) => {
    const formatted = formatNumberWithCommas(value);
    setOtherIncomes(formatted);
    if (onOtherIncomesChange) {
      onOtherIncomesChange(formatted);
    }
  };

  const handleSalesReturnsChange = (value) => {
    const formatted = formatNumberWithCommas(value);
    setSalesReturns(formatted);
    if (onSalesReturnsChange) {
      onSalesReturnsChange(formatted);
    }
  };

  const handleExemptSalesChange = (value) => {
    const formatted = formatNumberWithCommas(value);
    setExemptSales(formatted);
    if (onExemptSalesChange) {
      onExemptSalesChange(formatted);
    }
  };

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
            value={parseFloat(grossSales.replace(/,/g, '')).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            readOnly
            className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-gray-900 font-semibold text-sm bg-gray-50"
          />
        </div>

        {/* Other Incomes */}
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1.5">Other Incomes</label>
          <input 
            type="text" 
            placeholder="0.00"
            value={otherIncomes === '0.00' ? '' : otherIncomes}
            onChange={(e) => handleOtherIncomesChange(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-gray-900 text-sm placeholder:text-gray-400"
          />
        </div>

        {/* Sales Returns and EXEMPT Sales - 2 Column */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1.5">Sales Returns</label>
            <input 
              type="text" 
              placeholder="0.00"
              value={salesReturns === '0.00' ? '' : salesReturns}
              onChange={(e) => handleSalesReturnsChange(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-gray-900 text-sm placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1.5">EXEMPT Sales</label>
            <input 
              type="text" 
              placeholder="0.00"
              value={exemptSales === '0.00' ? '' : exemptSales}
              onChange={(e) => handleExemptSalesChange(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-gray-900 font-semibold text-sm placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Closing Stock */}
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1.5">Closing Stock</label>
          <input 
            type="text" 
            placeholder="0.00"
            value={closingStock === '0.00' ? '' : closingStock}
            onChange={(e) => handleClosingStockChange(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-red-600 font-semibold text-sm placeholder:text-red-400"
          />
        </div>
      </div>
    </div>
  );
};

export default RevenueAndInventorySection;
