import React from 'react';

const MetricCard = ({ title, value, subtitle, trend, bgColor = 'bg-white' }) => {
    return (
        <div className={`${bgColor} rounded-lg p-6 shadow-sm border border-gray-100`}>
            <div className="text-sm text-gray-500 mb-2">{title}</div>
            <div className="flex items-baseline gap-2 mb-1">
                <div className="text-4xl font-bold text-gray-800">{value}</div>
                {trend && (
                    <div className={`text-sm font-medium ${
                        trend.startsWith('+') ? 'text-green-600' : 'text-gray-600'
                    }`}>
                        {trend}
                    </div>
                )}
            </div>
            {subtitle && (
                <div className={`text-xs font-medium ${
                    subtitle.includes('Urgent') ? 'text-orange-500' : 
                    subtitle.includes('Attention') ? 'text-orange-500' : 
                    'text-gray-600'
                }`}>
                    {subtitle}
                </div>
            )}
        </div>
    );
};

export default MetricCard;
