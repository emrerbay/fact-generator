import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="fixed right-0 bottom-0 mr-2 mb-2 mt-4 text-gray-600 text-xs md:text-base">
            <p>© 2024 - {currentYear} RandomFacts</p>
        </footer>
    );
};

export default Footer;
