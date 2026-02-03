import React, { useState } from 'react';

const TransactionsTable = ({ transactions = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);

  const summaryMetrics = [
    { label: 'Total Invoice', value: 'RS1200,000.00', bgColor: 'bg-gray-50', iconBg: 'bg-gray-100', iconColor: 'text-gray-600', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { label: 'Total Paid', value: 'RS1200,000.00', bgColor: 'bg-green-50', textColor: 'text-green-600', iconBg: 'bg-green-100', iconColor: 'text-green-600', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Total Outstanding', value: 'RS1200,000.00', bgColor: 'bg-orange-50', textColor: 'text-orange-600', iconBg: 'bg-orange-100', iconColor: 'text-orange-600', icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Overdue', value: 'RS1200,000.00', bgColor: 'bg-red-50', textColor: 'text-red-600', iconBg: 'bg-red-100', iconColor: 'text-red-600', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  ];

  const mockTransactions = transactions.length > 0 ? transactions : Array(8).fill(null).map((_, idx) => ({
    id: `INV-${1045 + idx}`,
    date: 'Jan 25, 2026',
    type: idx % 2 === 0 ? 'Invoice' : 'Payment',
    description: 'Q1 Software Licence',
    amount: 'Rs8,500',
    status: idx % 3 === 0 ? 'Paid' : idx % 3 === 1 ? 'Completed' : 'Overdue'
  }));

  const getStatusStyle = (status) => {
    const styles = {
      'Paid': 'bg-green-100 text-green-700',
      'Completed': 'bg-blue-100 text-blue-700',
      'Overdue': 'bg-red-100 text-red-700'
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Transactions</h2>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              Export Report
            </button>
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Export Excel</span>
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span>Export PDF</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {summaryMetrics.map((metric, idx) => (
          <div key={idx} className={`${metric.bgColor} border border-gray-200 rounded-lg p-4`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${metric.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                <svg className={`w-5 h-5 ${metric.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={metric.icon} />
                </svg>
              </div>
              <div>
                <div className="text-xs text-gray-600 mb-1">{metric.label}</div>
                <div className={`text-2xl font-bold ${metric.textColor || 'text-gray-900'}`}>{metric.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-50 border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Transaction ID</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Description</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockTransactions.map((transaction, idx) => (
              <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-blue-600">{transaction.id}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{transaction.date}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{transaction.type}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{transaction.description}</td>
                <td className="py-3 px-4 text-sm text-gray-900 font-medium">{transaction.amount}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusStyle(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-600">Showing 1 of 2222 transactions</span>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Previous</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;
