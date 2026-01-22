export const formatNumber = (value) =>
    typeof value === 'number'
        ? value.toLocaleString(undefined, { maximumFractionDigits: 1 })
        : value;

export const formatDelta = (delta) => {
    if (typeof delta !== 'number') return '';
    const prefix = delta >= 0 ? '+' : '';
    return `${prefix}${delta}% vs last period`;
};

export const formatTimeAgo = (timestamp) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.round(diff / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.round(minutes / 60);
    if (hours < 48) return `${hours}h ago`;
    const days = Math.round(hours / 24);
    return `${days}d ago`;
};
