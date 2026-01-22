import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const AppShell = ({ children, user }) => (
    <div className="app-shell flex flex-col min-h-screen">
        <Navbar user={user} />
        <main className="app-main flex-1">{children}</main>
        <Footer />
    </div>
);

export default AppShell;
