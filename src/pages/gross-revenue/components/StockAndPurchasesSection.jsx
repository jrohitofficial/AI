import React, { useState } from 'react';

const StockAndPurchasesSection = ({ onOpeningStockChange, onPurchasesChange, onPurchaseReturnsChange }) => {
  const [openingStock, setOpeningStock] = useState('4,500,000.00');
  const [domesticPurchases, setDomesticPurchases] = useState('0.00');
  const [importPurchases, setImportPurchases] = useState('0.00');
  const [exemptPurchases, setExemptPurchases] = useState('125,000.00');
  const [purchaseReturns, setPurchaseReturns] = useState('0.00');

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

  const handleOpeningStockChange = (value) => {
    const formatted = formatNumberWithCommas(value);
    setOpeningStock(formatted);
    if (onOpeningStockChange) {
      onOpeningStockChange(formatted);
    }
  };

  const handlePurchasesChange = (domestic, imports, exempt) => {
    if (onPurchasesChange) {
      onPurchasesChange({ domestic, imports, exempt });
    }
  };

  const handleDomesticChange = (value) => {
    const formatted = formatNumberWithCommas(value);
    setDomesticPurchases(formatted);
    handlePurchasesChange(formatted, importPurchases, exemptPurchases);
  };

  const handleImportChange = (value) => {
    const formatted = formatNumberWithCommas(value);
    setImportPurchases(formatted);
    handlePurchasesChange(domesticPurchases, formatted, exemptPurchases);
  };

  const handleExemptChange = (value) => {
    const formatted = formatNumberWithCommas(value);
    setExemptPurchases(formatted);
    handlePurchasesChange(domesticPurchases, importPurchases, formatted);
  };

  const handlePurchaseReturnsChange = (value) => {
    const formatted = formatNumberWithCommas(value);
    setPurchaseReturns(formatted);
    if (onPurchaseReturnsChange) {
      onPurchaseReturnsChange(formatted);
    }
  };

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
          <div className="mt-1.5 flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">NPR</span>
            <input 
              type="text" 
              placeholder="0.00"
              value={openingStock}
              onChange={(e) => handleOpeningStockChange(e.target.value)}
              className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-gray-900 font-semibold bg-gray-50 text-sm"
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
              value={domesticPurchases}
              onChange={(e) => handleDomesticChange(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-gray-900 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1.5">Import Purchases</label>
            <input 
              type="text" 
              placeholder="0.00"
              value={importPurchases}
              onChange={(e) => handleImportChange(e.target.value)}
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
            value={exemptPurchases}
            onChange={(e) => handleExemptChange(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-gray-900 text-sm"
          />
        </div>

        {/* Purchase Returns */}
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1.5">Purchase Returns</label>
          <input 
            type="text" 
            placeholder="0.00"
            value={purchaseReturns}
            onChange={(e) => handlePurchaseReturnsChange(e.target.value)}
            className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-red-600 font-semibold text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default StockAndPurchasesSection;
