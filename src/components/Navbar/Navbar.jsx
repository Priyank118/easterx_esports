import React, { useState } from 'react';
import { cn } from '../../utils/cn';

const Navbar = ({ onNavLinkClick, navigateToPage, currentPage }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinksData = [
        { href: '#hero-section', label: 'Home', page: 'home', sectionId: '#hero-section' },
        { href: '#about-snippet', label: 'About Us', page: 'home', sectionId: '#about-snippet' },
        { href: '#highlights', label: 'Events', page: 'home', sectionId: '#highlights' },
        { href: '#team-lineup', label: 'Our Squad', page: 'home', sectionId: '#team-lineup' },
        { href: 'journey', label: 'Our Journey', page: 'bgmiJourney', sectionId: null },
        { href: 'gallery', label: 'Gallery', page: 'gallery', sectionId: null },
    ];

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleNavAction = (link) => {
        if (link.page === 'bgmiJourney' || link.page === 'gallery') {
            navigateToPage(link.page);
        } else {
            if (currentPage !== 'home') {
                navigateToPage('home');
                setTimeout(() => onNavLinkClick(link.sectionId), 50);
            } else {
                onNavLinkClick(link.sectionId);
            }
        }
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };

    const handleLogoClick = () => {
        if (currentPage !== 'home') {
            navigateToPage('home');
            setTimeout(() => onNavLinkClick('#hero-section'), 50);
        } else {
            onNavLinkClick('#hero-section');
        }
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    }

    return (
        <header className="navbar">
            <div className="container-nav">
                <a href="#hero-section" className="logo" onClick={(e) => { e.preventDefault(); handleLogoClick(); }}>
                    <img
                        src={'/images/image.png'}
                        alt="Easterx Esports Logo"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/150x50/1f1f1f/00aaff?text=EX+Logo&font=orbitron';
                        }}
                    />
                </a>
                <button
                    className={cn("menu-toggle", isMobileMenuOpen && "active")}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <span></span><span></span><span></span>
                </button>
                <nav>
                    <ul className={cn("nav-links", isMobileMenuOpen && "active")}>
                        {navLinksData.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.page === 'home' && link.sectionId ? link.sectionId : '#'}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavAction(link);
                                    }}
                                    className={(currentPage === link.page && (link.page === 'bgmiJourney' || link.page === 'gallery' || (currentPage === 'home' && typeof window !== 'undefined' && window.location.hash === link.sectionId && link.sectionId))) ? "active" : ""}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;