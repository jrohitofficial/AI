import React from 'react';
import Section from '../ui/Section';
import Button from '../common/Button';
import Badge from '../common/Badge';
import AvatarList from '../ui/AvatarList';
import { team } from '../../data/team';

const HeroSection = () => (
    <Section
        id="overview"
        title="Customer Intelligence Hub"
        subtitle="Reusable UI components with dummy data to showcase a modern analytics console."
        actions={<Badge label="Live Preview" />}
    >
        <div className="hero">
            <div>
                <h1>Insights, alerts, and activity in one cohesive view.</h1>
                <p>
                    Compose dashboards from modular pieces: hero, metrics grid, timeline, and testimonials. Swap in real
                    data later without changing the layout.
                </p>
                <div className="hero-actions">
                    <Button variant="primary">Create new dashboard</Button>
                    <Button variant="ghost">Share with team</Button>
                </div>
            </div>
            <div className="hero-panel">
                <div className="section-subtitle">Active collaborators</div>
                <AvatarList people={team} />
                <div className="section-subtitle" style={{ marginTop: 12 }}>
                    Components stay presentation-only; no API keys or external calls.
                </div>
            </div>
        </div>
    </Section>
);

export default HeroSection;
