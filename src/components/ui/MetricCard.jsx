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
        return trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600';
    };

    const getTrendBgColor = (trend) => {
        if (!trend) return 'bg-gray-50';
        return trend.startsWith('+') ? 'bg-emerald-50' : 'bg-rose-50';
    };

    return (
        <div className={`group bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 ${className}`}>
            {/* Header with Title */}
            <div className="mb-4">
                <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider leading-tight">
                    {title}
                </h3>
            </div>
            
            {/* Value Display */}
            <div className="mb-3">
                <div className="text-3xl font-bold text-gray-900 tabular-nums tracking-tight leading-none">
                    {value}
                </div>
            </div>

            {/* Trend, Subtitle, and Badge Footer */}
            <div className="flex items-center justify-between min-h-[24px]">
                {trend && (
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${getTrendBgColor(trend)} transition-colors duration-200`}>
                        <img src="/icon/progression.png" alt="trend" className="w-3.5 h-3.5" />
                        <span className={`text-[11px] font-semibold ${getTrendColor(trend)} tabular-nums whitespace-nowrap`}>
                            {trend}
                        </span>
                    </div>
                )}
                
                {subtitle && (
                    <div className={`text-[11px] font-medium ${subtitleColor} ${trend ? 'text-right' : 'text-left'} leading-tight`}>
                        {subtitle}
                    </div>
                )}

                {badge && (
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${badgeColor} ${trend || subtitle ? 'text-right' : 'text-left'} leading-tight`}>
                        <img src="/icon/urgent.png" alt="badge" className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-bold whitespace-nowrap">{badge}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MetricCard;
