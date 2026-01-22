import React from 'react';

const Section = ({ id, title, subtitle, children, actions = null }) => (
    <section id={id} className="section">
        <header className="section-header">
            <div>
                <div className="section-title">{title}</div>
                {subtitle ? <div className="section-subtitle">{subtitle}</div> : null}
            </div>
            {actions}
        </header>
        {children}
    </section>
);

export default Section;
