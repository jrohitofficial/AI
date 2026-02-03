import React from 'react';

const FinancialDetailsSection = ({ client }) => {
  const financialDetails = [
    { label: 'Credit limit', value: client.creditLimit || 'Rs 150,000' },
    { label: 'Available Credit', value: client.availableCredit || 'Rs 150,000' },
    { label: 'Payment Terms', value: client.paymentTerms || 'Net 45' },
    { label: 'Payment Method', value: client.paymentMethod || 'Wire Transfer' },
    { label: 'Currency', value: client.currency || 'Nepalese' },
    { label: 'Discount Rate', value: client.discountRate || '8%' },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Financial Details</h3>
      <div className="grid grid-cols-3 gap-6">
        {financialDetails.map((item, idx) => (
          <div key={idx}>
            <div className="text-sm text-gray-600 mb-1">{item.label}</div>
            <div className="text-sm font-medium text-gray-900">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialDetailsSection;
