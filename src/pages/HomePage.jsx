import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <div>
            <Header />
            <main>
                <h2>Welcome to the Home Page</h2>
                <p>This is a simple React application using dummy data.</p>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;