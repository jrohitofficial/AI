import React from 'react';

const Card = ({ 
    title, 
    value, 
    subtitle, 
    accent,
    className = '',
    children 
}) => (
    <div className={`bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow ${className}`}>
        {title && (
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                {accent && (
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                        {accent}
                    </span>
                )}
            </div>
        )}
        {value && <div className="text-4xl font-bold text-gray-800 mb-2">{value}</div>}
        {subtitle && <div className="text-sm text-gray-500 mb-4">{subtitle}</div>}
        {children}
    </div>
);

export default Card;
