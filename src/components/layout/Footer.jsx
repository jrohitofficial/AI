import React from 'react';

const Footer = () => (
    <footer className="footer">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div>Built with reusable React components and dummy data.</div>
            <div style={{ marginTop: 6 }}>© {new Date().getFullYear()} AICA Studio</div>
        </div>
    </footer>
);

export default Footer;
