import React from 'react';

const ClientInfoSection = ({ client }) => {
  const infoItems = [
    { label: 'Industry type', value: client.industry },
    { label: 'Company Name', value: client.companyName },
    { label: 'Tax ID', value: client.taxId },
    { label: 'Company Size', value: client.companySize },
    { label: 'Account Manager', value: client.accountManager },
    { label: 'Client Since', value: client.clientSince },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Client Information</h3>
      <div className="grid grid-cols-2 gap-6">
        {infoItems.map((item, idx) => (
          <div key={idx}>
            <div className="text-sm text-gray-600 mb-1">{item.label}</div>
            <div className="text-sm font-medium text-gray-900">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientInfoSection;
