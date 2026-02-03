import React from 'react';

const RecentInvoicesList = ({ invoices = [] }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg font-bold text-gray-900">Recent Invoices</h3>
      </div>
      <div className="space-y-2">
        {invoices.map((invoice, idx) => (
          <div key={idx} className="flex items-center justify-between py-1.5 border-b border-gray-200 last:border-0">
            <div>
              <div className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">{invoice.id}</div>
              <div className="text-xs text-gray-500">{invoice.date}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">{invoice.amount}</div>
              <div className={`text-xs font-semibold ${invoice.status === 'Paid' ? 'text-green-600' : 'text-orange-600'}`}>
                {invoice.status}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
        View all Resources →
      </button>
    </div>
  );
};

export default RecentInvoicesList;
