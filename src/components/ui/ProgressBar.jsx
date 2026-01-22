import React from 'react';

const ProgressBar = ({ 
    value = 0, 
    max = 100, 
    label, 
    showValue = true,
    color = 'bg-blue-600',
    size = 'medium',
    className = ''
}) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    const sizeClasses = {
        small: 'h-1',
        medium: 'h-2',
        large: 'h-3',
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {(label || showValue) && (
                <div className="flex justify-between items-center">
                    {label && (
                        <span className="text-sm font-medium text-gray-700">{label}</span>
                    )}
                    {showValue && (
                        <span className="text-sm font-bold text-gray-800">
                            {Math.round(percentage)}%
                        </span>
                    )}
                </div>
            )}
            <div className="w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                    className={`${sizeClasses[size]} rounded-full ${color} transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                    role="progressbar"
                    aria-valuenow={value}
                    aria-valuemin={0}
                    aria-valuemax={max}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
