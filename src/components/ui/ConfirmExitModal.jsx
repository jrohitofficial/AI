import React, { useState } from 'react';
import Modal from './Modal';
import ActionButton from './ActionButton';

const ConfirmExitModal = ({ isOpen, onClose, onConfirm, title = 'Exit Workspace', message = 'Are you sure you want to exit? Any unsaved changes will be lost.' }) => {
    const [isConfirming, setIsConfirming] = useState(false);

    const handleConfirm = async () => {
        setIsConfirming(true);
        try {
            if (onConfirm) {
                await onConfirm();
            }
            setIsConfirming(false);
            onClose();
        } catch (error) {
            console.error('Error confirming exit:', error);
            setIsConfirming(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} size="md" variant="bottom">
            <div className="p-6">
                <p className="text-gray-700 mb-6 leading-relaxed">{message}</p>
                
                <div className="flex gap-4 justify-end">
                    <ActionButton
                        variant="secondary"
                        size="medium"
                        onClick={onClose}
                        disabled={isConfirming}
                    >
                        No, I will stay
                    </ActionButton>
                    <ActionButton
                        variant="danger"
                        size="medium"
                        state={isConfirming ? 'loading' : 'default'}
                        onClick={handleConfirm}
                        disabled={isConfirming}
                    >
                        Yes, Proceed
                    </ActionButton>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmExitModal;
