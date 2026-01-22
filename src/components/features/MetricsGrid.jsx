import React from 'react';
import Section from '../ui/Section';
import Card from '../ui/Card';
import { formatNumber, formatDelta } from '../../utils/formatters';

const MetricsGrid = ({ items }) => (
    <Section id="metrics" title="Key metrics" subtitle="Dummy values to demonstrate a grid of reusable statistic cards.">
        <div className="grid cols-3">
            {items.map((metric) => (
                <Card
                    key={metric.label}
                    title={metric.label}
                    value={formatNumber(metric.value)}
                    subtitle={formatDelta(metric.delta)}
                />
            ))}
        </div>
    </Section>
);

export default MetricsGrid;
