import React, { useState, useEffect } from 'react';
import './index.css'; // Import the global styles

import { cn } from './utils/cn';
import Preloader from './components/Preloader/Preloader';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import BgmiJourneyPage from './pages/BgmiJourneyPage/BgmiJourneyPage';
import GalleryPage from './pages/GalleryPage/GalleryPage';

export default function App() {
    const [isAppLoading, setIsAppLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState('home');

    useEffect(() => {
        const handleLoad = () => {
            setTimeout(() => {
                const preloaderElement = document.getElementById('preloader');
                if (preloaderElement) preloaderElement.classList.add('hidden');
                document.body.classList.add('loaded');
                setIsAppLoading(false);
            }, 200);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            const fallbackTimeout = setTimeout(handleLoad, 3500);
            return () => {
                window.removeEventListener('load', handleLoad);
                clearTimeout(fallbackTimeout);
            };
        }
    }, []);

    const navigateTo = (pageName) => {
        setCurrentPage(pageName);
        window.scrollTo(0, 0);
    };

    const handleNavLinkClick = (targetId) => {
        if (!targetId || targetId === '#') {
            console.warn("Placeholder or invalid link clicked:", targetId);
            return;
        }
        if (currentPage === 'home') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.warn(`Target element with ID '${targetId}' not found on home page.`);
            }
        } else {
            console.warn(`Attempted to scroll to ${targetId} directly while not on home page. Page should be switched via Navbar logic.`);
        }
    };

    const renderCurrentPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage onNavLinkClick={handleNavLinkClick} navigateToPage={navigateTo} />;
            case 'bgmiJourney':
                return <BgmiJourneyPage navigateToPage={navigateTo} />;
            case 'gallery':
                return <GalleryPage navigateToPage={navigateTo} />;
            default:
                return <div className="container" style={{ padding: "50px 0", textAlign: "center" }}>Error: Page not found.</div>;
        }
    }

    return (
        <>
            {isAppLoading && <Preloader />}
            <div className={cn("app-container", isAppLoading && "loading")}>
                <Navbar
                    onNavLinkClick={handleNavLinkClick}
                    navigateToPage={navigateTo}
                    currentPage={currentPage}
                />
                <main>
                    {renderCurrentPage()}
                </main>
                <Footer />
            </div>
        </>
    );
}