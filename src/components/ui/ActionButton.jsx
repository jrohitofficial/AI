import React from 'react';

const ActionButton = ({ 
    variant = 'primary',
    size = 'medium',
    state = 'default', // 'default', 'loading', 'success'
    loading = false,
    disabled = false,
    className = '',
    onClick,
    children,
    icon: Icon,
    successIcon = null,
    ...props 
}) => {
    const isLoading = loading || state === 'loading';
    const isSuccess = state === 'success';

    const variants = {
        primary: {
            default: 'bg-blue-600 text-white hover:bg-blue-700',
            loading: 'bg-blue-500 text-white cursor-wait',
            success: 'bg-green-600 text-white hover:bg-green-700',
        },
        secondary: {
            default: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
            loading: 'bg-gray-100 text-gray-800 cursor-wait',
            success: 'bg-green-100 text-green-800 hover:bg-green-200',
        },
        danger: {
            default: 'bg-red-600 text-white hover:bg-red-700',
            loading: 'bg-red-500 text-white cursor-wait',
            success: 'bg-green-600 text-white hover:bg-green-700',
        },
        ghost: {
            default: 'bg-transparent text-gray-700 hover:bg-gray-100',
            loading: 'bg-gray-50 text-gray-700 cursor-wait',
            success: 'bg-green-50 text-green-700 hover:bg-green-100',
        },
    };

    const sizes = {
        small: 'px-3 py-1.5 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg',
    };

    const currentVariant = variants[variant] || variants.primary;
    const stateStyle = currentVariant[isSuccess ? 'success' : (isLoading ? 'loading' : 'default')];

    return (
        <button
            type="button"
            disabled={disabled || isLoading}
            onClick={onClick}
            className={`
                inline-flex items-center justify-center gap-2
                rounded-lg font-medium transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                ${stateStyle}
                ${sizes[size]}
                ${className}
            `}
            {...props}
        >
            {isLoading ? (
                <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {children}
                </>
            ) : isSuccess ? (
                <>
                    {successIcon ? (
                        <successIcon className="w-4 h-4" />
                    ) : (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    )}
                    {children}
                </>
            ) : Icon ? (
                <>
                    <Icon className="w-4 h-4" />
                    {children}
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default ActionButton;
