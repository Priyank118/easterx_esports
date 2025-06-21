import React from 'react';
import Hero from '../../components/Hero/Hero';
import HighlightsSection from '../../components/HighlightsSection/HighlightsSection';
import AboutSnippet from '../../components/AboutSnippet/AboutSnippet';
import TeamLineup from '../../components/TeamLineup/TeamLineup';

const HomePage = ({ onNavLinkClick, navigateToPage }) => {
    return (
        <>
            <Hero onNavLinkClick={onNavLinkClick} />
            <HighlightsSection onNavLinkClick={onNavLinkClick} />
            <AboutSnippet navigateToPage={navigateToPage} />
            <TeamLineup />
        </>
    );
};

export default HomePage;