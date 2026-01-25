import React from 'react';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Proceed', cancelText = 'Cancel' }) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-in">
                {/* Title */}
                {title && (
                    <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                        {title}
                    </h3>
                )}

                {/* Message */}
                <p className="text-gray-700 text-center mb-8 text-lg leading-relaxed">
                    {message}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={handleConfirm}
                        className="px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
                    >
                        {confirmText}
                    </button>
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all transform hover:scale-105 shadow-lg"
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
