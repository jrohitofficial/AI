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
    status, 
    progress, 
    dueDate, 
    assignedTo,
    tasks = [],
    onViewDetails
}) => {
    const getStatusConfig = (status) => {
        const config = {
            'COMPLETED': {
                badge: 'bg-green-100 text-green-700',
                bg: 'bg-green-50 border-green-200',
                icon: '✓',
                progressColor: 'bg-green-500'
            },
            'IN PROGRESS': {
                badge: 'bg-blue-100 text-blue-700',
                bg: 'bg-blue-50 border-blue-200',
                icon: '⟳',
                progressColor: 'bg-blue-500'
            },
            'NOT STARTED': {
                badge: 'bg-gray-100 text-gray-700',
                bg: 'bg-gray-50 border-gray-200',
                icon: '○',
                progressColor: 'bg-gray-400'
            }
        };
        return config[status] || config['NOT STARTED'];
    };

    const statusConfig = getStatusConfig(status);

    return (
        <div 
            className={`rounded-lg p-4 border ${statusConfig.bg} hover:shadow-md transition-all cursor-pointer font-['Inter',sans-serif]`}
            onClick={onViewDetails}
        >
            {/* Main Row */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                    <div className="text-lg font-bold text-gray-600 mt-0.5">{statusConfig.icon}</div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
                        <p className="text-xs text-gray-600">
                            Due: <span className="font-medium">{new Date(dueDate).toLocaleDateString()}</span>
                            {assignedTo && assignedTo !== 'Unassigned' && (
                                <span> • Assigned to: <span className="font-medium">{assignedTo}</span></span>
                            )}
                        </p>
                    </div>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${statusConfig.badge}`}>
                    {status}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-600">Progress</span>
                    <span className="text-xs font-bold text-gray-900">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-300 ${statusConfig.progressColor}`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Sub Tasks */}
            {tasks.length > 0 && (
                <div className="space-y-1.5 mt-3 pt-3 border-t border-gray-200/50">
                    {tasks.slice(0, 3).map((task, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                            <span className={`font-bold flex-shrink-0 ${
                                task.status === 'COMPLETED' ? 'text-green-600' : 
                                task.status === 'IN PROGRESS' ? 'text-blue-600' : 
                                'text-gray-400'
                            }`}>
                                {task.status === 'COMPLETED' ? '✓' : 
                                 task.status === 'IN PROGRESS' ? '→' : '○'}
                            </span>
                            <span className={task.status === 'COMPLETED' ? 'text-gray-500 line-through' : ''}>
                                {task.name}
                            </span>
                        </div>
                    ))}
                    {tasks.length > 3 && (
                        <p className="text-xs text-gray-500 font-medium pt-1">+{tasks.length - 3} more tasks</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChecklistItem;
