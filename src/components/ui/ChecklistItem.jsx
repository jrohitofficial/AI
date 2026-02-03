import React from 'react';

/**
 * ChecklistItem Component
 * Professional checklist item with status, progress tracking, and sub-tasks
 * Reusable across the entire project
 * @param {Object} props - Component props
 * @param {string} props.title - Item title
 * @param {string} props.status - Status: 'COMPLETED', 'IN PROGRESS', 'NOT STARTED'
 * @param {number} props.progress - Progress percentage (0-100)
 * @param {string} props.dueDate - Due date string
 * @param {string} props.assignedTo - Assigned person name
 * @param {Array} props.tasks - Array of sub-tasks
 * @param {Function} props.onViewDetails - Callback for viewing details
 */
const ChecklistItem = ({ 
    title, 
    progress, 
    onViewDetails
}) => {
    const getVisualConfig = (titleText) => {
        const normalized = titleText.toLowerCase();
        if (normalized.includes('planning') || normalized.includes('risk')) {
            return {
                iconBg: 'bg-blue-100',
                iconColor: 'text-blue-600',
                progressColor: 'bg-green-500',
                iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
            };
        }
        if (normalized.includes('vat') || normalized.includes('tax')) {
            return {
                iconBg: 'bg-orange-100',
                iconColor: 'text-orange-600',
                progressColor: 'bg-orange-500',
                iconPath: 'M9 7h6m0 10v-3m-6 3v-3m-6-4h18a2 2 0 012 2v6a2 2 0 01-2 2H3a2 2 0 01-2-2v-6a2 2 0 012-2z'
            };
        }
        return {
            iconBg: 'bg-gray-100',
            iconColor: 'text-gray-500',
            progressColor: 'bg-slate-800',
            iconPath: 'M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'
        };
    };

    const visual = getVisualConfig(title);

    return (
        <div
            className="rounded-xl p-3 transition-all cursor-pointer"
            onClick={onViewDetails}
        >
            <div className="space-y-2">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${visual.iconBg}`}>
                        <svg className={`w-5 h-5 ${visual.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={visual.iconPath} />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h4 className="text-base font-semibold text-gray-900">{title}</h4>
                            <span className="text-xs font-semibold text-gray-500">{progress}%</span>
                        </div>
                        <div className="mt-2 w-full bg-gray-200/80 rounded-full h-2.5 overflow-hidden">
                            <div
                                className={`h-full rounded-full ${visual.progressColor}`}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChecklistItem;
