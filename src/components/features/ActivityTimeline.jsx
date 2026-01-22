import React, { useEffect, useState } from 'react';
import Section from '../ui/Section';
import { fetchActivities } from '../../services/mockClient';
import { formatTimeAgo } from '../../utils/formatters';

const ActivityTimeline = ({ seed }) => {
    const [items, setItems] = useState(seed);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchActivities(seed).then((payload) => {
            setItems(payload);
            setLoading(false);
        });
    }, [seed]);

    return (
        <Section
            id="activity"
            title="Activity timeline"
            subtitle="Server-free async mock. Swappable with a real service later."
            actions={loading ? <span className="badge">Loading</span> : null}
        >
            <div className="timeline">
                {items.map((item) => (
                    <div key={item.id} className="timeline-item">
                        <div>
                            <div className="timeline-title">{item.title}</div>
                            <div className="timeline-meta">{item.actor} · {item.channel}</div>
                        </div>
                        <div className="timeline-meta">{formatTimeAgo(item.timestamp)}</div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default ActivityTimeline;
