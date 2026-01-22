import React from 'react';

const MetricCard = ({ 
    title, 
    value, 
    subtitle,
    subtitleColor = 'text-gray-600',
    trend, 
    trendColor = 'text-gray-600',
    badge,
    badgeColor = 'bg-gray-100 text-gray-700',
    className = '' 
}) => {
    const getTrendColor = (trend) => {
        if (!trend) return trendColor;
        return trend.startsWith('+') ? 'text-green-600' : 'text-red-600';
    };

    return (
        <div className={`bg-white rounded-lg p-6 shadow-sm border border-gray-100 ${className}`}>
            <div className="text-sm text-gray-500 mb-2">{title}</div>
            <div className="flex items-baseline gap-2 mb-1">
                <div className="text-4xl font-bold text-gray-800">{value}</div>
                {trend && (
                    <div className={`text-sm font-medium ${getTrendColor(trend)}`}>
                        {trend}
                    </div>
                )}
            </div>
            {subtitle && (
                <div className={`text-xs font-medium ${subtitleColor}`}>
                    {subtitle}
                </div>
            )}
            {badge && (
                <div className={`text-xs font-semibold px-2 py-1 rounded mt-2 inline-block ${badgeColor}`}>
                    {badge}
                </div>
            )}
        </div>
    );
};

export default MetricCard;
