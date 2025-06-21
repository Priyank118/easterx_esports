import React, { useEffect, useRef } from 'react';
import Section from '../Section/Section';
import useScrollReveal from '../../hooks/useScrollReveal';

const AboutSnippet = ({ navigateToPage }) => {
    const { observeElement } = useScrollReveal(0.15);
    const contentRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) observeElement(contentRef.current);
        if (imageRef.current) observeElement(imageRef.current);
    }, [observeElement]);

    return (
        <Section id="about-snippet" className="bg-darker">
            <div className="about-snippet-container">
                <div ref={contentRef} className="about-snippet-content reveal-on-scroll">
                    <h2 style={{ textAlign: 'left', marginBottom: '20px', fontSize: 'clamp(1.8em, 5vw, 2.5em)' }}>
                        The Heart of BGMI Action: <span style={{ color: 'var(--primary-color)' }}>Easterx Esports</span>
                    </h2>
                    <p style={{lineHeight: 1.7, marginBottom: '15px'}}>
                        Easterx Esports is India's dedicated Battlegrounds Mobile India (BGMI) powerhouse, born from a passion for competitive gaming and community building.
                    </p>
                    <p style={{lineHeight: 1.7, marginBottom: '30px'}}>
                        Whether you're aiming for the "Winner Winner Chicken Dinner" in high-stakes tournaments or looking for a well-managed platform for your own esports event, you've found your lobby.
                    </p>
                    <button onClick={() => navigateToPage('bgmiJourney')} className="btn">
                        Our BGMI Journey
                    </button>
                </div>
                <div ref={imageRef} className="about-snippet-image reveal-on-scroll">
                    <img
                        src="/images/team.png"
                        alt="Easterx Esports BGMI Team montage"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/500x350/121212/ffffff?text=BGMI+Team+Montage&font=orbitron'; }}
                    />
                </div>
            </div>
        </Section>
    );
};

export default AboutSnippet;