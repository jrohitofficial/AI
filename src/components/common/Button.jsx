import React from 'react';

const Button = ({ 
    variant = 'primary', 
    size = 'medium',
    icon: Icon,
    loading = false,
    disabled = false,
    className = '',
    children,
    ...props 
}) => {
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    };

    const sizes = {
        small: 'px-3 py-1.5 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg',
    };

    return (
        <button
            type="button"
            disabled={disabled || loading}
            className={`
                inline-flex items-center justify-center gap-2
                rounded-lg font-medium transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
                ${variants[variant]}
                ${sizes[size]}
                ${className}
            `}
            {...props}
        >
            {loading ? (
                <span className="animate-spin">⏳</span>
            ) : Icon ? (
                <Icon className="w-4 h-4" />
            ) : null}
            {children}
        </button>
    );
};

export default Button;
