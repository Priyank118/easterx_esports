import React, { useEffect, useRef } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';

const BgmiJourneyPage = ({ navigateToPage }) => {
    const { observeElement } = useScrollReveal(0.05);

    const titleBlockRef = useRef(null);
    const competitiveSectionRef = useRef(null);
    const orgSectionRef = useRef(null);
    const communitySectionRef = useRef(null);
    const roadAheadSectionRef = useRef(null);
    const ctaSectionRef = useRef(null);
    const backButtonRef = useRef(null);

    useEffect(() => {
        const refsToObserve = [
            titleBlockRef, competitiveSectionRef, orgSectionRef,
            communitySectionRef, roadAheadSectionRef, ctaSectionRef, backButtonRef
        ];
        refsToObserve.forEach(ref => {
            if (ref.current) observeElement(ref.current);
        });
    }, [observeElement]);

    const renderListItems = (items, baseDelay = 0) => {
        return items.map((item, index) => (
            <li
                key={index}
                
                style={{
                    transitionDelay: `${baseDelay + index * 100}ms`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                    lineHeight: '1.7'
                }}
            >
                <span className="themed-bullet">‣</span>
                <span>{item}</span>
            </li>
        ));
    };

    const renderIconListItems = (items, baseDelay = 0) => {
        return items.map((item, index) => (
            <li
                key={index}
                
                style={{
                    transitionDelay: `${baseDelay + index * 100}ms`,
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px',
                    fontSize: '1em',
                    lineHeight: '1.6'
                }}
            >
                <span className="list-icon">{item.substring(0, item.indexOf(' '))}</span>
                <span>{item.substring(item.indexOf(' ') + 1)}</span>
            </li>
        ));
    };

    const sectionBlockStyle = {
        marginTop: '30px',
        marginBottom: '50px',
        padding: '30px',
        background: 'var(--surface-color)',
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.35)'
    };

    const quoteBlockStyle = {
        fontStyle: 'italic',
        color: 'var(--text-color-muted)',
        textAlign: 'center',
        fontSize: '1.15em',
        marginTop: '25px',
        padding: '25px',
        borderLeft: `4px solid var(--primary-color)`,
        borderRight: `4px solid var(--primary-color)`,
        borderRadius: '8px',
        background: 'rgba(0, 170, 255, 0.03)'
    };

    return (
        <div className="container" style={{ padding: '40px 0'}}>
            <div ref={titleBlockRef} className="reveal-on-scroll">
                <h2 className="journey-main-title">
                    <span className="emoji-title-anim">🛣️</span> Our Journey
                </h2>
                <p className="journey-intro-text" style={{ color: 'var(--primary-color)', fontWeight: 500 }}>
                    From battleground warriors to tournament architects — Easterx Esports has evolved into a force that defines grassroots esports in India.
                </p>
            </div>

            <div ref={competitiveSectionRef}  style={{ ...sectionBlockStyle, transitionDelay: '0.1s' }}>
                <h3 className="section-heading-journey">
                    <span className="emoji-heading-anim">🎮</span> 2019–2025: Competitive Timeline
                </h3>
                <div style={{ marginBottom: '30px', transitionDelay: '0.1s' }}>
                    <h4 className="sub-heading-journey">
                        <span className="emoji-subheading-anim">🏆</span> International Recognition
                    </h4>
                    <div  className="achievement-block reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
                        <p className="achievement-title">PUBG Mobile World League (PMWL) – Semi-Finalists</p>
                        <p className="achievement-description">Participated and reached semi-finals in PUBG’s biggest international stage — competing with top global teams.</p>
                    </div>
                    <div  className="achievement-block reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
                        <p className="achievement-title">Red Bull M.E.O Season 4 – Semi-Finalists <span style={{ color: 'var(--primary-color)', fontWeight: 'normal' }}>(₹20 Lakh Prize Pool)</span></p>
                        <p className="achievement-description">Represented central India in the prestigious Red Bull Mobile Esports Open; emerged as one of the top contenders nationally.</p>
                    </div>
                </div>
                <div ref={el => el && observeElement(el)}  style={{ marginTop: '20px', transitionDelay: '0.2s' }}>
                    <h4 className="sub-heading-journey"><span className="emoji-subheading-anim">⚔️</span> National Grind & Rise</h4>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0', fontSize: '1.05em', marginBottom: '15px' }}>
                        {renderListItems(['Progressed from T3 Scrims to Semi T1 Levels, competing in high-tier lobbies with India\'s rising teams.', 'Invited to exclusive showdowns and custom rooms hosted by top esports organizations across India.', 'Finalists and semi-finalists in multiple mid-tier BGMI and PUBG tournaments, especially during the ban waves and revival stages.'], 100)}
                    </ul>
                    <p  style={{ ...quoteBlockStyle, transitionDelay: '0.3s' }}>“We’ve clutched through patches, bans, and resets – and we’re still climbing.”</p>
                </div>
            </div>

            <div ref={orgSectionRef}  style={{ ...sectionBlockStyle, transitionDelay: '0.15s' }}>
                <h3 className="section-heading-journey"><span className="emoji-heading-anim">🧩</span> Organizational Contributions</h3>
                <div  style={{ marginBottom: '30px', transitionDelay: '0.1s' }}>
                    <h4 className="sub-heading-journey"><span className="emoji-subheading-anim">🌏</span> International Tournament Hosting</h4>
                    <ul style={{ listStyleType: 'none', paddingLeft: '0', fontSize: '1.05em', marginBottom: '15px' }}>{renderListItems(['Successfully organized 2 international PUBG Mobile tournaments, uniting players from India, Pakistan, and Bangladesh with 100+ team participation.', 'Created a competitive yet community-driven environment during periods when official circuits were unstable.'], 100)}</ul>
                </div>
                <div  style={{ marginTop: '20px', transitionDelay: '0.2s' }}>
                    <h4 className="sub-heading-journey"><span className="emoji-subheading-anim">🏫</span> LAN Legacy at Citronics</h4>
                    <div  className="achievement-block reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
                        <p className="achievement-title"> Citronics 2K24 </p>
                        <p className="achievement-description">Hosted Central India’s first-ever college LAN event with over 70+ BGMI players, Free Fire customs, and audience footfall of 5,000+. Managed technical infrastructure, APNs, local networking, and smooth scheduling.</p>
                    </div>
                    <div  className="achievement-block reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
                        <p className="achievement-title">Citronics 2K25 <span style={{ fontWeight: 'normal', color: 'var(--text-color-muted)', fontSize: '0.9em' }}>– Organized in collaboration with Krafton India Esports as part of the Krafton College Campus Tour, featuring:</span></p>
                        <ul style={{ listStyleType: 'none', paddingLeft: '0', marginBottom: '15px' }}>{renderIconListItems(['🎮 BGMI (LAN Finals – 16 Teams)', '⚔️ Road to Valor (1v1)', '🏏 Real Cricket 24', '🔫 Bullet Echo Leaderboard', '🍪 Cookie Run India'], 100)}</ul>
                    </div>
                    <p  style={{ ...quoteBlockStyle, transitionDelay: '0.3s' }}>“From players to platforms — we’re building for the next generation.”</p>
                </div>
            </div>

            <div ref={communitySectionRef}  style={{ ...sectionBlockStyle, transitionDelay: '0.1s' }}>
                <h3 className="section-heading-journey"><span className="emoji-heading-anim">🤝</span> Community Building</h3>
                <ul style={{ listStyleType: 'none', paddingLeft: '0', fontSize: '1.05em', marginBottom: '0px' }}>{renderListItems(['Developed a custom Discord ecosystem for daily scrims, team registrations, and leaderboard-based performance tracking.', 'Built a streaming layer to broadcast LAN and online matches via YouTube and local college networks.', 'Managed flash mobs, sponsor stalls, and artist concerts for event crowd engagement.'], 100)}</ul>
            </div>

            <div ref={roadAheadSectionRef}  style={{ ...sectionBlockStyle, transitionDelay: '0.15s' }}>
                <h3 className="section-heading-journey"><span className="emoji-heading-anim">🎯</span> The Road Ahead – 2025 & Beyond</h3>
                <ul style={{ listStyleType: 'none', paddingLeft: '0', fontSize: '1.05em', marginBottom: '15px' }}>{renderListItems(['Hosting monthly BGMI/Free Fire tournaments with ₹10K–₹50K prize pools.', 'Expanding our community server to 1,000+ active users.', 'Launching Easterx Creator Program to support casters, editors & streamers.', 'Partnering with colleges and indie studios to bring game-dev and esports under one roof.', 'Planning a “Central India Esports Championship” — a LAN + Online hybrid league.'], 100)}</ul>
                <p ref={el => el && observeElement(el)} className="reveal-on-scroll" style={{ ...quoteBlockStyle, transitionDelay: '0.2s' }}>“We are not just chasing circles; we’re creating them.”</p>
            </div>

            <div ref={ctaSectionRef}  style={{ ...sectionBlockStyle, background: 'var(--card-color)', textAlign: 'center', transitionDelay: '0.1s' }}>
                <h3 className="journey-cta-heading"><span className="emoji-heading-anim">📢</span> Call to Action</h3>
                <p  style={{ fontSize: '1.1em', lineHeight: '1.6', marginBottom: '10px', color: 'var(--text-color-light)', transitionDelay: '0.1s' }}>Want to be part of our next lobby or host your own?</p>
                <p  style={{ fontSize: '1.1em', lineHeight: '1.6', marginBottom: '25px', color: 'var(--text-color-light)', transitionDelay: '0.2s' }}>Join Easterx — as a player, a creator, or a collaborator.</p>
                <div  style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', transitionDelay: '0.3s' }}>
                    <a href="https://discord.gg/YWgJJ4cSCa" target="_blank" rel="noopener noreferrer" className="cta-button-link"><button className="btn">💬 Join Our Discord</button></a>
                    <a href="mailto:easterxesports@gmail.com?subject=Enquiry%20about%20Scrims%2FCollaboration" target="_blank" rel="noopener noreferrer" className="cta-button-link"><button className="btn btn-secondary">📝 Contact US</button></a>
                    <a href="https://www.youtube.com/@easterx_esports" target="_blank" rel="noopener noreferrer" className="cta-button-link"><button className="btn">📺 Watch Live</button></a>
                </div>
            </div>

            <div ref={backButtonRef} className="reveal-on-scroll" style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px', transitionDelay: '0.2s' }}>
                <button className="btn btn-secondary" onClick={() => navigateToPage('home')}>Back to Home</button>
            </div>
        </div>
    );
};

export default BgmiJourneyPage;
