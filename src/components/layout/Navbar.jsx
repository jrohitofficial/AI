import React from 'react';
import { navLinks } from '../../config/navigation';
import Badge from '../common/Badge';

const Navbar = () => (
    <header className="navbar">
        <div className="navbar-inner">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Badge label="AICA" tone="accent" />
                <span style={{ fontWeight: 700 }}>Analytics Desk</span>
            </div>
            <nav className="nav-links">
                {navLinks.map((link) => (
                    <a key={link.label} className="nav-link" href={link.href}>
                        {link.label}
                    </a>
                ))}
            </nav>
        </div>
    </header>
);

export default Navbar;
