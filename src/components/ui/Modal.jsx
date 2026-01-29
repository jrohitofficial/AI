import React, { useEffect, useRef } from 'react';
import ScrollIndicator from './ScrollIndicator';

const Modal = ({ isOpen, onClose, title, children, size = 'md', variant = 'center' }) => {
    const contentRef = useRef(null);

    // Close on escape key and manage body overflow
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl'
    };

    // Drawer variant - right side panel
    if (variant === 'drawer') {
        return (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end">
                <div className="bg-white/95 backdrop-blur-xl h-full w-full max-w-2xl shadow-2xl flex flex-col animate-slide-in-right relative border-l border-white/20">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/50 bg-white/60 backdrop-blur-md">
                        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                            aria-label="Close"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div ref={contentRef} className="flex-1 overflow-y-auto p-6 hide-scrollbar">
                        {children}
                    </div>

                    {/* Scroll Down Indicator */}
                    <ScrollIndicator targetRef={contentRef} />
                </div>
            </div>
        );
    }

    // Bottom modal variant
    if (variant === 'bottom') {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 p-4 pb-8">
                <div className={`bg-white rounded-t-lg shadow-xl ${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto`}>
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-lg">
                        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                            aria-label="Close modal"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {children}
                    </div>
                </div>
            </div>
        );
    }

    // Center modal variant (default)
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`bg-white rounded-lg shadow-xl ${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto`}>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
                    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        aria-label="Close modal"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
