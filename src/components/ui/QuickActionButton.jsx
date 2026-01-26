import React from 'react';

/**
 * QuickActionButton Component
 * Professional action button with hover effects and smooth transitions
 * Reusable across the entire project
 * @param {Object} props - Component props
 * @param {string} props.title - Button title
 * @param {string} props.icon - Icon or emoji
 * @param {Function} props.onClick - Click handler
 */
const QuickActionButton = ({ title, icon, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between p-4 rounded-lg bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group font-['Inter',sans-serif]"
        >
            <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-900">{title}</span>
            <span className="text-lg flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200">{icon}</span>
        </button>
    );
};

export default QuickActionButton;
