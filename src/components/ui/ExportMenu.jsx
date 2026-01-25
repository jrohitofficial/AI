import React, { useRef, useEffect } from 'react';
import { Button } from '../index';

const ExportMenu = ({ isOpen, onClose }) => {
    const menuRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen, onClose]);

    const exportOptions = [
        {
            label: 'Export Excel',
            icon: (
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
        },
        {
            label: 'Export PDF',
            icon: (
                <svg className="w-4 h-4 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
        },
    ];

    if (!isOpen) return null;

    return (
        <div ref={menuRef} className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
            {exportOptions.map((option, index) => (
                <button
                    key={index}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-xs whitespace-nowrap transition-all duration-200 hover:translate-x-1 cursor-pointer group"
                    onClick={() => {
                        // Handle export action here
                        console.log(`Exporting as ${option.label}`);
                        onClose();
                    }}
                >
                    {option.icon}
                    <span className="group-hover:font-semibold">{option.label}</span>
                </button>
            ))}
        </div>
    );
};

export default ExportMenu;
