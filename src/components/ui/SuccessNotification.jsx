import React, { useEffect } from 'react';

const SuccessNotification = ({ isOpen, onClose, message, duration = 2500 }) => {
    useEffect(() => {
        if (isOpen && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isOpen, duration, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-12 animate-scale-in text-center">
                {/* Animated Success Circle with Checkmark */}
                <div className="flex justify-center mb-8">
                    <div className="relative w-24 h-24">
                        {/* Outer Circle Background */}
                        <svg 
                            className="w-24 h-24 absolute inset-0" 
                            viewBox="0 0 100 100"
                        >
                            {/* Circle */}
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="#3B82F6"
                                strokeWidth="3"
                                strokeDasharray="282.7"
                                strokeDashoffset="282.7"
                                className="animate-circle-fill"
                            />
                        </svg>

                        {/* Checkmark */}
                        <svg 
                            className="w-24 h-24 absolute inset-0" 
                            viewBox="0 0 100 100"
                        >
                            <path
                                d="M 30 55 L 45 70 L 75 35"
                                fill="none"
                                stroke="#3B82F6"
                                strokeWidth="5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeDasharray="100"
                                strokeDashoffset="100"
                                className="animate-checkmark-fill"
                            />
                        </svg>
                    </div>
                </div>

                {/* Success Message */}
                <p className="text-2xl font-semibold text-gray-900 leading-relaxed">
                    {message}
                </p>
            </div>
        </div>
    );
};

export default SuccessNotification;
