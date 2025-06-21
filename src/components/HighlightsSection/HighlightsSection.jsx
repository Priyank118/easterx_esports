import React from 'react';
import Section from '../Section/Section';
import useScrollReveal from '../../hooks/useScrollReveal';

const HighlightsSection = ({ onNavLinkClick }) => {
    const highlightsData = [
        { icon: '/images/helmet.png', alt: 'BGMI Helmet Icon', title: 'Pro Scrims & Tourneys', description: 'Experience top-tier BGMI scrims, daily custom rooms, and participate in our flagship tournaments with exciting prize pools.', buttonText: 'Coming Soon', buttonLink: '#' },
        { icon: '/images/airdrop.png', alt: 'BGMI Airdrop Icon', title: 'Custom Lobbies', description: 'Join our custom BGMI lobbies for daily action, map rotations, and community games. Perfect for squads and solo players.', buttonText: 'Coming Soon', buttonLink: '#' },
        { icon: '/images/chicken.png', alt: 'BGMI Chicken Dinner Icon', title: 'Organize Your Event', description: 'We provide end-to-end solutions from registrations, server hosting, live streaming, to prize distribution.', buttonText: 'Host With Us', buttonLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfBiqQ4n7pzzfy7LOkOFRXFlv9xrOKXiZJPgFE45G9xx5OWbw/viewform?usp=header' },
    ];
    const { observeElement } = useScrollReveal(0.05);

    return (
        <Section id="highlights" title="BGMI Tournaments & Features">
            <div className="card-grid">
                {highlightsData.map((item, index) => (
                    <div
                        key={index}
                        ref={el => el && observeElement(el)}
                        className="card reveal-on-scroll"
                       
                    >
                        <img
                            src={item.icon}
                            alt={item.alt}
                            className="icon"
                            style={{height: '300px', width: '300px', margin: '0 auto 25px auto'}}
                            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/60x60/242424/00aaff?text=ICON${index + 1}&font=roboto`; }}
                        />
                        <h3>{item.title}</h3>
                        <p className="description">{item.description}</p>
                        <div style={{marginTop: 'auto'}}>
                        {item.buttonLink && item.buttonLink.startsWith('http') ? (
                            <a href={item.buttonLink} target="_blank" rel="noopener noreferrer" className="btn">
                               {item.buttonText}
                            </a>
                        ) : (
                            <button onClick={() => onNavLinkClick(item.buttonLink)} className="btn">
                                {item.buttonText}
                            </button>
                        )}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default HighlightsSection;
