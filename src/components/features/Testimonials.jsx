import React from 'react';
import Section from '../ui/Section';
import Card from '../ui/Card';

const Testimonials = ({ items }) => (
    <Section id="feedback" title="Feedback" subtitle="Static endorsements fed via dummy data.">
        <div className="testimonials">
            {items.map((item) => (
                <Card key={item.name} title={item.name} subtitle={item.title}>
                    <div className="quote">“{item.quote}”</div>
                </Card>
            ))}
        </div>
    </Section>
);

export default Testimonials;
