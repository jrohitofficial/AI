import React from 'react';

const toneMap = {
    accent: {
        background: 'rgba(56, 189, 248, 0.12)',
        color: '#38bdf8',
        border: '1px solid rgba(56, 189, 248, 0.45)'
    },
    success: {
        background: 'rgba(34, 197, 94, 0.12)',
        color: '#22c55e',
        border: '1px solid rgba(34, 197, 94, 0.35)'
    }
};

const Badge = ({ label, icon = null, tone = 'accent' }) => {
    const style = toneMap[tone] || toneMap.accent;

    return (
        <span className="badge" style={style}>
            {icon}
            {label}
        </span>
    );
};

export default Badge;
