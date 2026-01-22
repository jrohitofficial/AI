import React from 'react';

const Input = ({ 
    label, 
    type = 'text', 
    placeholder, 
    value, 
    onChange, 
    error,
    icon: Icon,
    className = '',
    ...props 
}) => {
    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {Icon}
                    </div>
                )}
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`
                        w-full px-4 py-2 border rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                        ${Icon ? 'pl-10' : ''}
                        ${error ? 'border-red-500' : 'border-gray-300'}
                        transition-colors
                    `}
                    {...props}
                />
            </div>
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default Input;
