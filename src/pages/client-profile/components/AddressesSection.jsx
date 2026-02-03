import React from 'react';

const AddressesSection = ({ client }) => {
  const billingAddress = client.addresses?.billing || [
    'Everest Trading Company Limited',
    'Lazimpat Road, Maharajgun',
    'Kathmandu 44600',
    'Nepal'
  ];

  const shippingAddress = client.addresses?.shipping || [
    'Everest Logistic Center',
    'Industrial District, Balaju',
    'Kathmandu 44616',
    'Nepal'
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Addresses</h3>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="text-sm font-medium text-gray-900 mb-2">Billing Address</div>
          {billingAddress.map((line, idx) => (
            <div key={idx} className="text-sm text-gray-600">{line}</div>
          ))}
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900 mb-2">Shipping Address</div>
          {shippingAddress.map((line, idx) => (
            <div key={idx} className="text-sm text-gray-600">{line}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressesSection;
