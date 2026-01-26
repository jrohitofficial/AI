import React from 'react';

/**
 * RecentComment Component
 * Professional comment/activity component with user info and timestamp
 * Reusable across the entire project
 * @param {Object} props - Component props
 * @param {string} props.author - Author name
 * @param {string} props.role - Author role
 * @param {string} props.comment - Comment text
 * @param {number} props.timestamp - Timestamp in milliseconds
 * @param {string} props.avatar - Avatar initials
 */
const RecentComment = ({ author, role, comment, timestamp, avatar }) => {
    const getTimeAgo = (ts) => {
        const now = Date.now();
        const diff = now - ts;
        const mins = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (mins < 1) return 'Just now';
        if (mins < 60) return `${mins}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        
        const date = new Date(ts);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="p-4 rounded-lg bg-white border border-gray-200 hover:shadow-md transition-all duration-200 font-['Inter',sans-serif]">
            <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center font-bold text-sm text-white flex-shrink-0">
                    {avatar}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-baseline gap-2 mb-1">
                        <h4 className="font-semibold text-sm text-gray-900 truncate">{author}</h4>
                        <span className="text-xs text-gray-500 flex-shrink-0">{getTimeAgo(timestamp)}</span>
                    </div>

                    {/* Role */}
                    <p className="text-xs text-gray-500 font-medium mb-2">{role}</p>

                    {/* Comment */}
                    <p className="text-sm text-gray-700 leading-relaxed">{comment}</p>
                </div>
            </div>
        </div>
    );
};

export default RecentComment;
