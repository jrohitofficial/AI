import React from 'react';

const MetricCard = ({ label, value, subtitle, icon, iconBgColor = 'bg-blue-100', iconColor = 'text-blue-600' }) => {
  return (
    <div className={`${iconBgColor} rounded-lg p-6 shadow-sm border border-gray-200`}>
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0`}>
          <svg className={`w-7 h-7 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-700 font-medium mb-1">{label}</div>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <div className={`text-xs mt-1 ${subtitle?.includes('+') ? 'text-green-600 font-semibold' : 'text-gray-600'}`}>
            {subtitle}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
