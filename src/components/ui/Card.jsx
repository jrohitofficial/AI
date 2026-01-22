import React from 'react';

const Card = ({ title, value, subtitle, accent, children }) => (
    <div className="card">
        <div className="card-header">
            <div className="card-title">{title}</div>
            {accent ? <span className="badge">{accent}</span> : null}
        </div>
        {value ? <div className="card-value">{value}</div> : null}
        {subtitle ? <div className="section-subtitle">{subtitle}</div> : null}
        {children}
    </div>
);

export default Card;
