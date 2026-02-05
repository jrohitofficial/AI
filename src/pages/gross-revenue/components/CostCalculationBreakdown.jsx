import React, { useEffect } from 'react';

const CostCalculationBreakdown = ({
  openingStock = '4,500,000.00',
  purchases = { domestic: '0.00', imports: '0.00', exempt: '125,000.00' },
  directExpenses = '8,175,000.00',
  closingStock = '5,200,000.00',
  purchaseReturns = '0.00',
  grossSales = '0.00',
  otherIncomes = '0.00',
  exemptSales = '0.00',
  salesReturns = '0.00',
  onGrossMarginChange,
}) => {
  const vsLastYear = 2.4; // Can be positive or negative
  const isPositive = vsLastYear >= 0;

  // Helper functions to parse and format numbers
  const parseNumber = (num) => {
    if (!num || num === '') return 0;
    if (typeof num === 'string') {
      const parsed = parseFloat(num.replace(/,/g, ''));
      return isNaN(parsed) ? 0 : parsed;
    }
    const parsed = parseFloat(num);
    return isNaN(parsed) ? 0 : parsed;
  };

  const formatNumber = (num) => {
    const parsed = parseNumber(num);
    return parsed.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Calculate total purchases
  const totalPurchases =
    parseNumber(purchases.domestic) +
    parseNumber(purchases.imports) +
    parseNumber(purchases.exempt);

  const totalCogs =
    parseNumber(openingStock) +
    totalPurchases +
    parseNumber(directExpenses) -
    parseNumber(closingStock);

  // Calculate Gross Profit
  const grossProfit = 
    parseNumber(grossSales) +
    parseNumber(otherIncomes) +
    parseNumber(exemptSales) -
    parseNumber(salesReturns) -
    totalCogs;

  // Calculate Gross Margin %
  const grossMarginPercent = parseNumber(grossSales) > 0 
    ? ((grossProfit / parseNumber(grossSales)) * 100).toFixed(2)
    : 0;

  // Notify parent of gross margin changes
  useEffect(() => {
    if (onGrossMarginChange) {
      onGrossMarginChange(grossMarginPercent);
    }
  }, [grossMarginPercent, onGrossMarginChange]);

  return (
    <div className="space-y-3">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-md p-4 text-white relative overflow-hidden">
        <div className="absolute right-4 top-4 opacity-20">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v8m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14" />
          </svg>
        </div>
        <h3 className="text-xs font-semibold tracking-wide">CURRENT GROSS PROFIT</h3>
        <div className="text-2xl font-bold mt-2 tabular-nums">NPR {formatNumber(grossProfit)}</div>
        
        <div className="grid grid-cols-2 gap-3 pt-3 mt-3 border-t border-blue-500">
          <div>
            <p className="text-blue-100 text-[9px] font-semibold mb-0.5">GROSS MARGIN (%)</p>
            <p className="text-lg font-bold">{grossMarginPercent}%</p>
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
              <span className="text-sm text-gray-700">Opening Stock (+)</span>
              <span className="text-sm font-medium text-gray-900 tabular-nums">{formatNumber(openingStock)}</span>
            </div>
            
            <div className="py-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-800">Total Purchases (+)</span>
              </div>
              <div className="space-y-1.5 ml-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Domestic Purchases (+)</span>
                  <span className="text-sm font-medium text-gray-700 tabular-nums">{formatNumber(purchases.domestic)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Import Purchases (+)</span>
                  <span className="text-sm font-medium text-gray-700 tabular-nums">{formatNumber(purchases.imports)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">EXEMPT Purchases (+)</span>
                  <span className="text-sm font-medium text-gray-700 tabular-nums">{formatNumber(purchases.exempt)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-200">
                <span className="text-sm font-semibold text-gray-800">Total Purchase (+)</span>
                <span className="text-sm font-semibold text-gray-900 tabular-nums">{formatNumber(totalPurchases)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-1.5 ml-4">
              <span className="text-sm text-gray-700">Direct Expenses (+)</span>
              <span className="text-sm font-semibold text-gray-900 tabular-nums">{formatNumber(directExpenses)}</span>
            </div>
            
            <div className="flex justify-between items-center py-1.5 ml-4">
              <span className="text-sm text-gray-700">Less: Closing Stock (-)</span>
              <span className="text-sm font-semibold text-red-600 tabular-nums">({formatNumber(closingStock)})</span>
            </div>
            
            <div className="flex justify-between items-center py-2.5 bg-blue-50 -mx-3 px-3 mt-1">
              <span className="text-sm font-bold text-blue-900">Total COGS</span>
              <span className="text-lg font-bold text-blue-700 tabular-nums">{formatNumber(totalCogs)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostCalculationBreakdown;
