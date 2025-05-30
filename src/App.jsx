import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

// Helper function to construct class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

// --- ScrollReveal Hook ---
const useScrollReveal = (threshold = 0.1) => {
  const observerRef = useRef(null); 

  useEffect(() => {
    const currentObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed'); 
          } else {
            // entry.target.classList.remove('revealed'); // To re-animate on scroll up
          }
        });
      },
      { threshold } 
    );
    observerRef.current = currentObserver; 

    return () => {
      if (currentObserver) {
        currentObserver.disconnect();
      }
    };
  }, [threshold]); 

  const observeElement = (element) => {
    if (element && observerRef.current) {
      observerRef.current.observe(element);
    }
  };

  return { observeElement }; 
};

// --- GalleryPage Component ---
function GalleryPage({ navigateToPage }) {
  const { observeElement } = useScrollReveal(0.1);

  // MODIFIED generatePlaceholders function
  const generatePlaceholders = (eventName, folderName, imageBaseName, count, extension = 'jpg') => {
    return Array.from({ length: count }, (_, i) => ({
      id: `${eventName.replace(/\s+/g, '-')}-img-${i + 1}`,
      // Construct the dynamic src path
      // Assumes images are like: /images/citronics2k24/event_image_1.jpg, /images/citronics2k24/event_image_2.jpg etc.
      src: `/images/${folderName}/${imageBaseName}${i + 1}.${extension}`, 
      alt: `${eventName}`,
      eventName: eventName
    }));
  };

  // Example usage of the modified function:
  // Ensure 'citronics2k24' and 'citronics2k25' are the folder names inside 'public/images/'
  // And your images are named 'pic1.jpg', 'pic2.jpg' etc.
  const citronics2k24Images = generatePlaceholders("Citronics 2K24", "Citronics 2K24", "pic", 12, "jpg");
  const citronics2k25Images = generatePlaceholders("Citronics 2K25", "Citronics 2K25", "pic", 12, "jpg"); // Example with different base name and extension

  // ... (rest of your component: refs, useEffect, renderImageGrid, return statement)
  // Refs for section titles
  const pageTitleRef = useRef(null);
  const section2k24TitleRef = useRef(null);
  const section2k25TitleRef = useRef(null);
  const backButtonRef = useRef(null);

  useEffect(() => {
    if (pageTitleRef.current) observeElement(pageTitleRef.current);
    if (section2k24TitleRef.current) observeElement(section2k24TitleRef.current);
    if (section2k25TitleRef.current) observeElement(section2k25TitleRef.current);
    if (backButtonRef.current) observeElement(backButtonRef.current);
  }, [observeElement]);

  const renderImageGrid = (images, eventName) => (
    <div className="gallery-grid">
      {images.map((image, index) => (
        <div
          key={image.id}
          ref={el => el && observeElement(el)} 
          className="gallery-image-placeholder-wrapper reveal-on-scroll"
          style={{ transitionDelay: `${index * 75}ms` }} 
        >
          <img
            src={image.src} // This will now use the dynamically generated path
            alt={image.alt}
            className="gallery-image"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src=`https://placehold.co/400x300/121212/e0e0e0?text=Image+Missing&font=sans-serif`;
            }}
          />
          <div className="gallery-image-overlay">
            <p>{image.alt}</p>
          </div>
        </div>
      ))}
    </div>
  );
  
  return (
    <div style={{ padding: '20px 0px', textAlign: 'left', color: 'var(--text-color)' }} className="container gallery-page-container">
      <h2 ref={pageTitleRef} className="gallery-page-title reveal-on-scroll">
        <span className="emoji-title-anim">🖼️</span> Event Gallery
      </h2>

      <section className="gallery-event-section">
        <h3 ref={section2k24TitleRef} className="gallery-section-title reveal-on-scroll">
          Citronics 2K24 Highlights
        </h3>
        {renderImageGrid(citronics2k24Images, "Citronics 2K24")}
      </section>

      <section className="gallery-event-section">
        <h3 ref={section2k25TitleRef} className="gallery-section-title reveal-on-scroll" style={{transitionDelay: '0.2s'}}>
          Citronics 2K25 Showcase
        </h3>
        {renderImageGrid(citronics2k25Images, "Citronics 2K25")}
      </section>
      
      <div ref={backButtonRef} className="reveal-on-scroll" style={{textAlign: 'center', marginTop: '40px', marginBottom: '40px', transitionDelay: '0.3s'}}>
        <button className="btn btn-secondary" onClick={() => navigateToPage('home')}>Back to Home</button>
      </div>
    </div>
  );
}

// --- BgmiJourneyPage Component ---
function BgmiJourneyPage({ navigateToPage }) {
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
        ref={el => el && observeElement(el)} 
        className="reveal-on-scroll" 
        style={{ 
          transitionDelay: `${baseDelay + index * 100}ms`, 
          display: 'flex',
          alignItems: 'flex-start', 
          marginBottom: '12px',
          lineHeight: '1.7'
        }}
      >
        <span className="themed-bullet">&#8227;</span>
        <span>{item}</span>
      </li>
    ));
  };
  
  const renderIconListItems = (items, baseDelay = 0) => {
    return items.map((item, index) => (
        <li 
            key={index} 
            ref={el => el && observeElement(el)} 
            className="reveal-on-scroll" 
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
    textAlign:'center', 
    fontSize: '1.15em', 
    marginTop: '25px', 
    padding: '25px', 
    borderLeft: `4px solid var(--primary-color)`, 
    borderRight: `4px solid var(--primary-color)`, 
    borderRadius: '8px', 
    background: 'rgba(0, 170, 255, 0.03)'
  };

  return (
    <div style={{ padding: '20px 0px', textAlign: 'left', color: 'var(--text-color)' }} className="container">
      <div ref={titleBlockRef} className="reveal-on-scroll"> 
        <h2 className="journey-main-title">
            <span className="emoji-title-anim">🛣️</span> Our Journey
        </h2>
        <p className="journey-intro-text" style={{color: 'var(--primary-color)', fontWeight: 500}}>
          From battleground warriors to tournament architects — Easterx Esports has evolved into a force that defines grassroots esports in India.
        </p>
      </div>

      <div ref={competitiveSectionRef} className="reveal-on-scroll" style={{...sectionBlockStyle, transitionDelay: '0.1s'}}>
        <h3 className="section-heading-journey">
          <span className="emoji-heading-anim">🎮</span> 2019–2025: Competitive Participation Timeline
        </h3>
        <div ref={el => el && observeElement(el)} className="reveal-on-scroll" style={{marginBottom: '30px', transitionDelay:'0.1s'}}>
          <h4 className="sub-heading-journey">
            <span className="emoji-subheading-anim">🏆</span> International Recognition
          </h4>
          <div ref={el => el && observeElement(el)} className="achievement-block reveal-on-scroll" style={{transitionDelay: '0.1s'}}>
            <p className="achievement-title">PUBG Mobile World League (PMWL) – Semi-Finalists</p>
            <p className="achievement-description">Participated and reached semi-finals in PUBG’s biggest international stage — competing with top global teams.</p>
          </div>
          <div ref={el => el && observeElement(el)} className="achievement-block reveal-on-scroll" style={{transitionDelay: '0.2s'}}>
            <p className="achievement-title">Red Bull M.E.O Season 4 – Semi-Finalists <span style={{color: 'var(--primary-color)', fontWeight:'normal'}}>(₹20 Lakh Prize Pool)</span></p>
            <p className="achievement-description">Represented central India in the prestigious Red Bull Mobile Esports Open; emerged as one of the top contenders nationally.</p>
          </div>
        </div>
        <div ref={el => el && observeElement(el)} className="reveal-on-scroll" style={{marginTop: '20px', transitionDelay:'0.2s'}}>
          <h4 className="sub-heading-journey"><span className="emoji-subheading-anim">⚔️</span> National Grind & Rise</h4>
          <ul style={{ listStyleType: 'none', paddingLeft: '0', fontSize: '1.05em', marginBottom: '15px'}}>
            {renderListItems(['Progressed from T3 Scrims to Semi T1 Levels, competing in high-tier lobbies with India\'s rising teams.','Invited to exclusive showdowns and custom rooms hosted by top esports organizations across India.','Finalists and semi-finalists in multiple mid-tier BGMI and PUBG tournaments, especially during the ban waves and revival stages.'], 100)} 
          </ul>
          <p ref={el => el && observeElement(el)} className="reveal-on-scroll" style={{...quoteBlockStyle, transitionDelay: '0.3s'}}>“We’ve clutched through patches, bans, and resets – and we’re still climbing.”</p>
        </div>
      </div>

      <div ref={orgSectionRef} className="reveal-on-scroll" style={{...sectionBlockStyle, transitionDelay: '0.15s'}}>
        <h3 className="section-heading-journey"><span className="emoji-heading-anim">🧩</span> 2019–2025: Organizational & Hosting Contributions</h3>
        <div ref={el => el && observeElement(el)} className="reveal-on-scroll" style={{marginBottom: '30px', transitionDelay:'0.1s'}}>
          <h4 className="sub-heading-journey"><span className="emoji-subheading-anim">🌏</span> International Tournament Hosting</h4>
          <ul style={{ listStyleType: 'none', paddingLeft: '0', fontSize: '1.05em', marginBottom: '15px'}}>{renderListItems(['Successfully organized 2 international PUBG Mobile tournaments, uniting players from India, Pakistan, and Bangladesh with 100+ team participation.','Created a competitive yet community-driven environment during periods when official circuits were unstable.'], 100)}</ul>
        </div>
        <div ref={el => el && observeElement(el)} className="reveal-on-scroll" style={{marginTop: '20px', transitionDelay:'0.2s'}}>
          <h4 className="sub-heading-journey"><span className="emoji-subheading-anim">🏫</span> LAN Legacy at Citronics</h4>
          <div ref={el => el && observeElement(el)} className="achievement-block reveal-on-scroll" style={{transitionDelay: '0.1s'}}>
            <p className="achievement-title"> Citronics 2K24 </p>
            <p className="achievement-description">Hosted Central India’s first-ever college LAN event with over 70+ BGMI players, Free Fire customs, and audience footfall of 5,000+. Managed technical infrastructure, APNs, local networking, and smooth scheduling.</p>
          </div>
          <div ref={el => el && observeElement(el)} className="achievement-block reveal-on-scroll" style={{transitionDelay: '0.2s'}}>
            <p className="achievement-title">Citronics 2K25 <span style={{fontWeight:'normal', color: 'var(--text-color-muted)', fontSize:'0.9em'}}>– Organized in collaboration with Krafton India Esports as part of the Krafton College Campus Tour, featuring:</span></p>
            <ul style={{ listStyleType: 'none', paddingLeft: '0', marginBottom: '15px'}}>{renderIconListItems(['🎮 BGMI (LAN Finals – 16 Teams)','⚔️ Road to Valor (1v1)','🏏 Real Cricket 24','🔫 Bullet Echo Leaderboard','🍪 Cookie Run India'], 100)}</ul>
          </div>
          <p ref={el => el && observeElement(el)} className="reveal-on-scroll" style={{...quoteBlockStyle, transitionDelay: '0.3s'}}>“From players to platforms — we’re building for the next generation.”</p>
        </div>
      </div>
      
      <div ref={communitySectionRef} className="reveal-on-scroll" style={{...sectionBlockStyle, transitionDelay: '0.1s'}}>
        <h3 className="section-heading-journey"><span className="emoji-heading-anim">🤝</span> Community Building</h3>
        <ul style={{ listStyleType: 'none', paddingLeft: '0', fontSize: '1.05em', marginBottom: '0px'}}>{renderListItems(['Developed a custom Discord ecosystem for daily scrims, team registrations, and leaderboard-based performance tracking.','Built a streaming layer to broadcast LAN and online matches via YouTube and local college networks.','Managed flash mobs, sponsor stalls, and artist concerts for event crowd engagement.'], 100)}</ul>
      </div>

      <div ref={roadAheadSectionRef} className="reveal-on-scroll" style={{...sectionBlockStyle, transitionDelay: '0.15s'}}>
        <h3 className="section-heading-journey"><span className="emoji-heading-anim">🎯</span> The Road Ahead – 2025 and Beyond</h3>
        <ul style={{ listStyleType: 'none', paddingLeft: '0', fontSize: '1.05em', marginBottom: '15px'}}>{renderListItems(['Hosting monthly BGMI/Free Fire tournaments with ₹10K–₹50K prize pools.','Expanding our community server to 1,000+ active users.','Launching Easterx Creator Program to support casters, editors & streamers.','Partnering with colleges and indie studios to bring game-dev and esports under one roof.','Planning a “Central India Esports Championship” — a LAN + Online hybrid league.'], 100)}</ul>
        <p ref={el => el && observeElement(el)} className="reveal-on-scroll" style={{...quoteBlockStyle, transitionDelay: '0.2s'}}>“We are not just chasing circles; we’re creating them.”</p>
      </div>

      <div ref={ctaSectionRef} className="reveal-on-scroll" style={{...sectionBlockStyle, background: 'var(--card-color)', textAlign: 'center', transitionDelay: '0.1s'}}>
        <h3 className="journey-cta-heading"><span className="emoji-heading-anim">📢</span> Call to Action</h3>
        <p ref={el => el && observeElement(el)} className="reveal-on-scroll" style={{fontSize: '1.1em', lineHeight: '1.6', marginBottom: '10px', color: 'var(--text-color-light)', transitionDelay: '0.1s'}}>Want to be part of our next lobby or host your own?</p>
        <p ref={el => el && observeElement(el)} className="reveal-on-scroll" style={{fontSize: '1.1em', lineHeight: '1.6', marginBottom: '25px', color: 'var(--text-color-light)', transitionDelay: '0.2s'}}>Join Easterx — as a player, a creator, or a collaborator.</p>
        <div ref={el => el && observeElement(el)} className="reveal-on-scroll" style={{display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', transitionDelay: '0.3s'}}>
          <a href="https://discord.gg/YWgJJ4cSCa" target="_blank" rel="noopener noreferrer" ref={el => el && observeElement(el)} className="reveal-on-scroll cta-button-link" style={{ transitionDelay: '0.1s' }}><button className="btn">💬 Join Our Discord</button></a>
          <a href="mailto:easterxesports@gmail.com?subject=Enquiry%20about%20Scrims%2FCollaboration" target="_blank" rel="noopener noreferrer" ref={el => el && observeElement(el)} className="reveal-on-scroll cta-button-link" style={{ transitionDelay: '0.2s' }}><button className="btn btn-secondary">📝 Contact US</button></a>
          <a href="https://www.youtube.com/@easterx_esports" target="_blank" rel="noopener noreferrer" ref={el => el && observeElement(el)} className="reveal-on-scroll cta-button-link" style={{ transitionDelay: '0.3s' }}><button className="btn">📺 Watch Tournaments Live</button></a>
        </div>
      </div>

      <div ref={backButtonRef} className="reveal-on-scroll" style={{textAlign: 'center', marginTop: '40px', marginBottom: '20px', transitionDelay: '0.2s'}}>
        <button className="btn btn-secondary" onClick={() => navigateToPage('home')}>Back to Home</button>
      </div>
    </div>
  );
}


// --- Global Styles Component ---
const GlobalStyles = () => (
  <style>{`
    :root {
        --primary-color: #00aaff;
        --primary-color-darker: #0088cc;
        --background-color: #121212;
        --surface-color: #1a1a1a; 
        --card-color: #242424; 
        --text-color: #e0e0e0;
        --text-color-light: #f5f5f5;
        --text-color-muted: #b0b0b0;
        --border-color: #333;
        --animation-timing: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        --animation-duration: 0.6s; 
        --animation-duration-fast: 0.4s;
    }
    html { scroll-behavior: smooth; } 
    body {
      background-color: var(--background-color);
      color: var(--text-color);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      opacity: 0; 
      transition: opacity 0.5s ease-in-out;
    }
    body.loaded {
      opacity: 1; 
    }
.hero-bg-slider {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}
.hero-bg-img {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: translateX(100%);
  transition: opacity 0.7s cubic-bezier(.77,0,.18,1), transform 0.7s cubic-bezier(.77,0,.18,1);
  pointer-events: none;
  z-index: 0;
}
.hero-bg-img.active {
  opacity: 1;
  transform: translateX(0);
  z-index: 2;
}
.hero-bg-img.slide-in {
  opacity: 1;
  transform: translateX(0);
  z-index: 2;
}
.hero-bg-img.slide-out {
  opacity: 0;
  transform: translateX(-100%);
  z-index: 1;
}
    .preloader { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: var(--background-color); display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 9999; transition: opacity 0.8s ease-out 0.5s, visibility 0.8s ease-out 0.5s; visibility: visible; opacity: 1; }
    .preloader.hidden { opacity: 0; visibility: hidden; }
    .preloader img { width: 80px; height: auto; margin-bottom: 15px; animation: pulseLogo 1.8s infinite ease-in-out; }
    .preloader p { color: var(--primary-color); font-size: 1.1em; letter-spacing: 1.5px; text-transform: uppercase; margin-top: 15px; }
    @keyframes pulseLogo { 0%, 100% { transform: scale(1); opacity: 0.7; } 50% { transform: scale(1.05); opacity: 1; } }
    .loading-animation-container { display: flex; justify-content: center; align-items: center; height: 25px; margin: 20px 0 10px 0; }
    .loader-bar { width: 6px; height: 5px; background-color: var(--primary-color); margin: 0 3px; border-radius: 3px; animation: barStretchDelay 1.2s infinite ease-in-out; }
    .loader-bar:nth-child(1) { animation-delay: -0.22s; } 
    .loader-bar:nth-child(2) { animation-delay: -0.11s; }
    .loader-bar:nth-child(3) { animation-delay: 0s; }
    .loader-bar:nth-child(4) { animation-delay: 0.11s; }
    .loader-bar:nth-child(5) { animation-delay: 0.22s; }
    @keyframes barStretchDelay { 0%, 40%, 100% { transform: scaleY(0.4); opacity: 0.7; } 20% { transform: scaleY(1.0); opacity: 1; } }

    .app-container { }
    .container { width: 90%; max-width: 1200px; margin-left: auto; margin-right: auto; padding-left: 1rem; padding-right: 1rem; }

    .navbar { background-color: rgba(31, 31, 31, 0.85); padding: 1em 0; border-bottom: 2px solid var(--primary-color); position: sticky; top: 0; z-index: 1000; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
    .navbar .container-nav { display: flex; justify-content: space-between; align-items: center; width: 95%; max-width: 1800px; margin-left : 25px; } /* Corrected margin for centering */
    .navbar .logo img { height: 50px; transition: transform 0.3s ease, filter 0.3s ease; }
    .navbar .logo img:hover { transform: scale(1.1); filter: drop-shadow(0 0 8px var(--primary-color)); }
    .navbar .nav-links { display: flex; list-style: none; padding: 0; margin: 0; }
    .navbar .nav-links li { margin-left: 20px; } /* Slightly reduced margin for more items */
    .navbar .nav-links a { color: var(--text-color); font-weight: 500; font-size: 1em; /* Adjusted for more items */ padding: 8px 10px; border-radius: 6px; transition: color 0.3s ease, background-color 0.3s ease, transform 0.3s ease; cursor: pointer; display:inline-block; }
    .navbar .nav-links a:hover, .navbar .nav-links a.active { color: #ffffff; background-color: rgba(0, 170, 255, 0.2); transform: translateY(-2px); }
    .navbar .menu-toggle { display: none; }

    .hero-section { height: 90vh; min-height: 500px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 0 20px; position: relative; overflow: hidden; background-color: var(--background-color); background-size: cover; background-position: center; }
    .hero-canvas-container { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; }
    .hero-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(10, 10, 20, 0.75); z-index: 1; }
    .hero-content { position: relative; z-index: 2; opacity:0; animation: fadeInHeroContainer 0.5s var(--animation-timing) 0.3s forwards; }
    @keyframes fadeInHeroContainer { to { opacity: 1; } }
    .hero-content h1 { font-size: clamp(2.8em, 7vw, 4.5em); margin-bottom: 0.2em; letter-spacing: 1.5px; text-shadow: 3px 3px 8px rgba(0,0,0,0.8); font-weight: 700; color: white; opacity: 0; transform: translateY(25px) scale(0.95); animation: slideUpFadeInHero 0.8s var(--animation-timing) 0.5s forwards; }
    .hero-content p { font-size: clamp(1.2em, 3.5vw, 1.7em); margin-bottom: 1.8em; color: var(--text-color-light); max-width: 750px; margin-left:auto; margin-right:auto; font-weight: 300; opacity: 0; transform: translateY(25px); animation: slideUpFadeInHero 0.8s var(--animation-timing) 0.7s forwards; }
    .hero-buttons .btn { margin: 10px 10px; opacity:0; transform: scale(0.8) translateY(10px); }
    .hero-buttons .btn:nth-child(1) { animation: popInButtonHero 0.6s var(--animation-timing) 1s forwards; }
    .hero-buttons .btn:nth-child(2) { animation: popInButtonHero 0.6s var(--animation-timing) 1.2s forwards; }
    @keyframes slideUpFadeInHero { 0% { opacity: 0; transform: translateY(25px) scale(0.95); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
    @keyframes popInButtonHero { 0% { opacity: 0; transform: scale(0.7) translateY(10px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }

    .btn { display: inline-block; background-color: var(--primary-color); color: #ffffff; padding: 14px 32px; border-radius: 30px; font-size: clamp(0.9em, 2.5vw, 1.1em); text-transform: uppercase; font-weight: bold; transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease; border: 2px solid var(--primary-color); box-shadow: 0 5px 15px rgba(0, 170, 255, 0.25); text-decoration: none; cursor: pointer; }
    .btn:hover { background-color: var(--primary-color-darker); border-color: var(--primary-color-darker); transform: translateY(-5px) scale(1.08); box-shadow: 0 10px 25px rgba(0, 136, 204, 0.5); text-decoration: none; }
    .btn-secondary { background-color: transparent; color: var(--primary-color); box-shadow: none; }
    .btn-secondary:hover { background-color: rgba(0, 170, 255, 0.15); color: var(--primary-color); border-color: var(--primary-color); box-shadow: 0 6px 15px rgba(0, 170, 255, 0.2); }

    .reveal-on-scroll { opacity: 1; transform: translateY(20px); transition: opacity var(--animation-duration) var(--animation-timing), transform var(--animation-duration) var(--animation-timing); }
    .reveal-on-scroll.revealed { opacity: 1; transform: translateY(0); }
    
    .emoji-title-anim, .emoji-heading-anim, .emoji-subheading-anim, .list-icon, .themed-bullet { display: inline-block; opacity: 0; transform: scale(0.5) rotate(-15deg); transition: opacity var(--animation-duration-fast) var(--animation-timing), transform var(--animation-duration-fast) var(--animation-timing); }
    .reveal-on-scroll.revealed .emoji-title-anim, .reveal-on-scroll.revealed .emoji-heading-anim, .reveal-on-scroll.revealed .emoji-subheading-anim, .reveal-on-scroll.revealed .list-icon, .reveal-on-scroll.revealed .themed-bullet { opacity: 1; transform: scale(1) rotate(0deg); transition-delay: 0.15s; }

    .themed-bullet { margin-right: 12px; color: var(--primary-color); font-size: 1.4em; line-height: 1; position: relative; top: 2px; }
    .list-icon { margin-right: 10px; font-size: 1.3em; color: var(--primary-color); }

    .journey-main-title { text-align: center; color: var(--primary-color); margin-bottom: 20px; font-size: clamp(2.5em, 6vw, 3.5em); }
    .journey-intro-text { font-size: 1.2em; line-height: 1.75; text-align: center; margin-bottom: 50px; color: var(--primary-color) !important; font-weight: 500; max-width: 800px; margin: 0 auto 50px auto; }
    .section-heading-journey { color: var(--primary-color); margin-top: 0; margin-bottom: 25px; border-bottom: 2px solid var(--primary-color-darker); padding-bottom: 15px; font-size: clamp(1.8em, 4vw, 2.2em); }
    .sub-heading-journey { color: var(--text-color-light); margin-top: 20px; margin-bottom: 15px; font-size: 1.5em; }
    .achievement-block { margin-bottom:20px; padding-left: 20px; border-left: 4px solid var(--primary-color); }
    .achievement-title { font-size: 1.1em; line-height: 1.6; font-weight: 600; color: var(--text-color-light); margin-bottom:5px; }
    .achievement-description { font-size: 1em; line-height: 1.6; color: var(--text-color-muted); }
    .journey-cta-heading { color: var(--primary-color); margin-top: 0; margin-bottom: 20px; font-size: clamp(1.8em, 4vw, 2.2em); border-bottom:none; padding-bottom: 0; }
    .cta-button-link { display: inline-block; }

    /* Gallery Page Styles */
    .gallery-page-container { padding-top: 40px; padding-bottom: 40px; }
    .gallery-page-title { text-align: center; color: var(--primary-color); margin-bottom: 50px; font-size: clamp(2.5em, 6vw, 3.5em); }
    .gallery-event-section { margin-bottom: 60px; }
    .gallery-section-title { text-align: center; color: var(--text-color-light); margin-bottom: 40px; font-size: clamp(1.8em, 4.5vw, 2.5em); border-bottom: 1px solid var(--border-color); padding-bottom: 15px; }
    .gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; }
    .gallery-image-placeholder-wrapper {
        background-color: var(--card-color);
        border-radius: 12px;
        overflow: hidden;
        position: relative;
        aspect-ratio: 4 / 3; /* Maintain aspect ratio */
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        transition: transform 0.3s var(--animation-timing), box-shadow 0.3s var(--animation-timing);
    }
    .gallery-image-placeholder-wrapper:hover {
        transform: translateY(-10px) scale(1.03);
        box-shadow: 0 12px 30px rgba(0, 170, 255, 0.3);
    }
    .gallery-image { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s var(--animation-timing); }
    .gallery-image-placeholder-wrapper:hover .gallery-image { transform: scale(1.1); }
    .gallery-image-overlay {
        position: absolute;
        bottom: 0; left: 0; right: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%);
        color: var(--text-color-light);
        padding: 20px 15px 15px 15px;
        opacity: 0;
        transform: translateY(100%);
        transition: opacity 0.3s var(--animation-timing), transform 0.3s var(--animation-timing);
    }
    .gallery-image-placeholder-wrapper:hover .gallery-image-overlay {
        opacity: 1;
        transform: translateY(0%);
    }
    .gallery-image-overlay p { margin: 0; font-size: 0.9em; text-align: center; }


    .section { padding: 70px 0; }
    .section.bg-darker { background-color: var(--background-color); }
    .section.bg-lighter-surface { background-color: #151515; }
    .section-title { text-align: center; font-size: clamp(2.2em, 5.5vw, 3em); margin-bottom: 60px; color: white; }

    .card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 35px; }
    .card { background-color: var(--card-color); padding: 35px; border-radius: 16px; text-align: center; box-shadow: 0 8px 25px rgba(0,0,0,0.5); transition: transform 0.4s var(--animation-timing), box-shadow 0.4s var(--animation-timing), border-color 0.4s var(--animation-timing); display: flex; flex-direction: column; border: 1px solid var(--border-color); }
    .card:hover { transform: translateY(-15px) scale(1.03) rotateZ(0.5deg); box-shadow: 0 18px 45px rgba(0,170,255,0.35); border-color: var(--primary-color); }
    .card .icon, .card .player-avatar { opacity: 0; transform: scale(0.6) translateY(10px); transition: opacity 0.5s var(--animation-timing), transform 0.5s var(--animation-timing); }
    .card.revealed .icon, .card.revealed .player-avatar { opacity: 1; transform: scale(1) translateY(0px); transition-delay: 0.1s; }
    .card h3, .card .player-role, .card p.description, .card .btn { opacity: 0; transform: translateY(15px); transition: opacity 0.4s var(--animation-timing), transform 0.4s var(--animation-timing); }
    .card.revealed h3 { opacity: 1; transform: translateY(0px); transition-delay: 0.2s; }
    .card.revealed .player-role { opacity: 1; transform: translateY(0px); transition-delay: 0.25s; }
    .card.revealed p.description { opacity: 1; transform: translateY(0px); transition-delay: 0.3s; }
    .card.revealed .btn { opacity: 1; transform: translateY(0px); transition-delay: 0.4s; }

    .about-snippet-container { display: flex; flex-wrap: wrap; align-items: center; gap: 60px; }
    .about-snippet-content { flex: 1; min-width: 300px; }
    .about-snippet-content.reveal-on-scroll { opacity: 0; transform: translateX(-30px); } 
    .about-snippet-content.reveal-on-scroll.revealed { opacity: 1; transform: translateX(0px); transition-delay: 0.1s; }
    .about-snippet-image { flex: 1; min-width: 300px; text-align: center; }
    .about-snippet-image.reveal-on-scroll { opacity: 0; transform: translateX(30px); } 
    .about-snippet-image.reveal-on-scroll.revealed { opacity: 1; transform: translateX(0px); transition-delay: 0.2s; }
    .about-snippet-image img { border-radius: 16px; box-shadow: 0 8px 25px rgba(0,0,0,0.4); max-width: 480px; transition: transform 0.4s var(--animation-timing), box-shadow 0.4s var(--animation-timing); }
    .about-snippet-image img:hover { transform: scale(1.08) rotate(-2deg); box-shadow: 0 12px 35px rgba(0, 170, 255, 0.25); }

    .footer { background-color: var(--surface-color); color: var(--text-color-muted); text-align: center; padding: 50px 20px; border-top: 1px solid #383838; }
    .footer p { margin: 0.8em 0; font-size: clamp(0.9em, 2.2vw, 1em); }
    .footer .social-links { display: flex; justify-content: center; gap: 30px; margin-top: 1rem; }
    .footer .social-links a { font-size: 2em; color: var(--text-color-muted); transition: color 0.3s ease, transform 0.3s ease; display: inline-block; }
    .footer .social-links a:hover { color: var(--primary-color); transform: scale(1.3) rotate(8deg); }

    /* Add or update inside your <style> in GlobalStyles */

/* --- General Mobile Improvements --- */
/* --- Responsive Mobile Styles --- */
/* --- Desktop Defaults (apply outside media queries) --- */
.container, .container-nav {
  width: 90%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  box-sizing: border-box;
}
.card-grid, .player-grid, .gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 35px;
  justify-items: stretch;
}
.card, .player-card {
  width: 100%;
  max-width: none;
  margin-left: 0;
  margin-right: 0;
  box-sizing: border-box;
  padding: 35px;
}

/* --- Responsive Mobile Styles --- */
@media (max-width: 900px) {
  .container, .container-nav {
    width: 100% !important;
    max-width: 100% !important;
    padding-left: 8px !important;
    padding-right: 8px !important;
    box-sizing: border-box;
  }
  .navbar .container-nav {
    margin-left: 0 !important;
    width: 100% !important;
    position: relative;
  }
  .navbar .logo img {
    height: 36px !important;
  }
  .navbar {
    padding: 0.5em 0 !important;
  }
  .navbar .nav-links {
    display: none;
    flex-direction: column;
    background: #181818;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100vw;
    z-index: 1001;
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 20px;
  }
  .navbar .nav-links.active {
    display: flex;
  }
  .navbar .nav-links li {
    margin: 18px 0;
    text-align: center;
  }
  .navbar .menu-toggle {
    display: inline-block !important;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 10px;
    z-index: 1100;
  }
  .navbar .menu-toggle span {
    display: block;
    width: 28px;
    height: 4px;
    margin: 5px auto;
    background: var(--primary-color);
    border-radius: 2px;
    transition: 0.3s;
  }
  .navbar .menu-toggle.active span:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
  }
  .navbar .menu-toggle.active span:nth-child(2) {
    opacity: 0;
  }
  .navbar .menu-toggle.active span:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
  }
}

@media (max-width: 768px) {
  html, body {
    overflow-x: hidden !important;
  }
  .container, .container-nav {
    width: 100% !important;
    max-width: 100% !important;
    padding-left: 6px !important;
    padding-right: 6px !important;
    box-sizing: border-box;
  }
    .journey-main-title,
  .journey-intro-text,
  .section-heading-journey,
  .sub-heading-journey,
  .journey-cta-heading {
    text-align: center !important;

    .journey-intro-text {
    margin-left: auto !important;
    margin-right: auto !important;
    max-width: 98vw !important;
    font-size: 1em !important;

    .achievement-block {
    padding-left: 10px !important;
    border-left-width: 2px !important;
  }

  .reveal-on-scroll[style*="background: var(--surface-color)"],
  .reveal-on-scroll[style*="background: var(--card-color)"] {
    padding: 14px !important;
    border-radius: 10px !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
    

  .section, .gallery-page-container {
    padding: 24px 0 !important;
  }
  .section-title, .gallery-page-title {
    font-size: 1.3em !important;
    margin-bottom: 20px !important;
  }
  .about-snippet-container {
    flex-direction: column !important;
    gap: 18px !important;
    text-align: center !important;
  }
  .about-snippet-image img,
  .player-avatar {
    max-width: 96vw !important;
    width: 100% !important;
    height: auto !important;
    display: block;
    margin-left: auto;
    margin-right: auto;
    object-fit: contain;
  }
}
  }
  .card-grid, .player-grid, .gallery-grid {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
    justify-items: center !important;
  }
  .card, .player-card {
    width: 100% !important;
    max-width: 350px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    box-sizing: border-box !important;
    padding: 14px !important;
  }
  .gallery-image-placeholder-wrapper {
    aspect-ratio: 4/3 !important;
    min-height: 110px !important;
  }
  .gallery-section-title {
    font-size: 1em !important;
    margin-bottom: 12px !important;
    padding-bottom: 6px !important;
  }
  .footer {
    padding: 18px 4px !important;
    font-size: 0.9em !important;
  }
  .footer .social-links {
    gap: 12px !important;
    font-size: 1.1em !important;
  }
  .hero-section {
    min-height: 300px !important;
    height: 55vh !important;
    padding: 0 2px !important;
  }
  .hero-content h1 {
    font-size: 1.3em !important;
    margin-bottom: 0.2em !important;
  }
  .hero-content p {
    font-size: 1em !important;
    margin-bottom: 0.7em !important;
  }
  .hero-buttons .btn {
    padding: 8px 12px !important;
    font-size: 0.95em !important;
    margin: 6px 2px !important;
  }
}
  

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 1em !important;
  }
  .hero-content p {
    font-size: 0.9em !important;
  }
  .btn, .btn-secondary {
    padding: 7px 10px !important;
    font-size: 0.9em !important;
    border-radius: 18px !important;
  }
  .gallery-image-placeholder-wrapper {
    min-height: 70px !important;
  }
  .about-snippet-image img {
    max-width: 98vw !important;
  }
  .footer {
    font-size: 0.8em !important;
  }
}
  
  `}</style>
);

// --- Preloader Component ---
const Preloader = () => {
  return (
    <div id="preloader" className="preloader">
      <img
        src={'/images/image.png'} 
        alt="Easterx Esports Logo Loading"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://placehold.co/100x100/121212/00aaff?text=EX&font=orbitron';
        }}
      />
      <div className="loading-animation-container">
        <div className="loader-bar"></div>
        <div className="loader-bar"></div>
        <div className="loader-bar"></div>
        <div className="loader-bar"></div>
        <div className="loader-bar"></div>
      </div>
      <p>Loading Arena...</p>
    </div>
  );
};

// --- Navbar Component ---
const Navbar = ({ onNavLinkClick, navigateToPage, currentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinksData = [
    { href: '#hero-section', label: 'Home', page: 'home', sectionId: '#hero-section' },
    { href: '#about-snippet', label: 'About Us', page: 'home', sectionId: '#about-snippet' },
    { href: '#highlights', label: 'BGMI Events', page: 'home', sectionId: '#highlights' },
    { href: '#team-lineup', label: 'Our Squad', page: 'home', sectionId: '#team-lineup' },
    { href: 'journey', label: 'Our Journey', page: 'bgmiJourney', sectionId: null }, 
    { href: 'gallery', label: 'Gallery', page: 'gallery', sectionId: null }, // New Gallery Link
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleNavAction = (link) => {
    if (link.page === 'bgmiJourney' || link.page === 'gallery') { // Include gallery
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
                  className={ (currentPage === link.page && (link.page === 'bgmiJourney' || link.page === 'gallery' || (currentPage === 'home' && typeof window !== 'undefined' && window.location.hash === link.sectionId && link.sectionId))) ? "active" : ""}
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


// --- Hero Component ---
const Hero = ({ onNavLinkClick }) => {
  const mountRef = useRef(null);
  const heroContentRef = useRef(null);

  // --- Image slider state ---
  const heroImages = [
    "/images/background.png",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
    "/images/hero4.jpg",
    "/images/hero5.jpg",
    "/images/hero6.jpg",
  ];
  const [currentBg, setCurrentBg] = useState(0);
  const [prevBg, setPrevBg] = useState(null);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    if (typeof THREE === 'undefined' || !mountRef.current) return;
    const currentMount = mountRef.current;
    let scene, camera, renderer, particles, particleMaterial;
    const particleCount = 500;
    let mouseX = 0, mouseY = 0;
    let windowHalfX = currentMount.offsetWidth / 2;
    let windowHalfY = currentMount.offsetHeight / 2;
    let animationFrameId;

    // --- Image slider interval ---
    const interval = setInterval(() => {
    setPrevBg(currentBg);
    setIsSliding(true);
    setTimeout(() => {
      setCurrentBg((prev) => (prev + 1) % heroImages.length);
      setTimeout(() => setIsSliding(false), 700); // match CSS transition duration
    }, 20); // Small delay to allow class to apply
  }, 3000);

    // --- Three.js particle background ---
    const init = () => { 
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, currentMount.offsetWidth / currentMount.offsetHeight, 1, 3000);
      camera.position.z = 800;
      particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const baseColor = new THREE.Color(0x00aaff);
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 2000;
        positions[i + 1] = (Math.random() - 0.5) * 2000;
        positions[i + 2] = (Math.random() - 0.5) * 2000;
        const colorVariation = (Math.random() - 0.5) * 0.4;
        const particleColor = baseColor.clone();
        particleColor.offsetHSL(0, 0, colorVariation);
        colors[i] = particleColor.r; colors[i + 1] = particleColor.g; colors[i + 2] = particleColor.b;
      }
      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particleMaterial = new THREE.PointsMaterial({ size: 5, vertexColors: true, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.8, depthWrite: false });
      const particleSystem = new THREE.Points(particles, particleMaterial);
      scene.add(particleSystem);
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(currentMount.offsetWidth, currentMount.offsetHeight);
      currentMount.appendChild(renderer.domElement);
      let lastMove = 0; const throttleDelay = 16; 
      const handleMouseMove = (event) => { const now = Date.now(); if (now - lastMove > throttleDelay) { onDocumentMouseMove(event); lastMove = now; } };
      document.addEventListener('mousemove', handleMouseMove, false);
      window.addEventListener('resize', onWindowResize, false);
      currentMount.handleMouseMove = handleMouseMove; 
    };
    const onWindowResize = () => { 
        if (!currentMount || !renderer || !camera) return;
        windowHalfX = currentMount.offsetWidth / 2; windowHalfY = currentMount.offsetHeight / 2;
        camera.aspect = currentMount.offsetWidth / currentMount.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.offsetWidth, currentMount.offsetHeight);
    };
    const onDocumentMouseMove = (event) => { 
        if (!currentMount) return;
        const rect = currentMount.getBoundingClientRect();
        const x = event.clientX - rect.left; const y = event.clientY - rect.top;
        mouseX = (x - windowHalfX) * 0.5; mouseY = (y - windowHalfY) * 0.5;
    };
    const animate = () => { animationFrameId = requestAnimationFrame(animate); renderLoop(); };
    const renderLoop = () => { 
        if (!scene || !camera || !renderer || !particles) return;
        const time = Date.now() * 0.00004;
        camera.position.x += (mouseX - camera.position.x) * 0.02;
        camera.position.y += (-mouseY - camera.position.y) * 0.02;
        camera.lookAt(scene.position);
        const positions = particles.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3 + 1] += Math.sin(time * ((i % 5) + 2) + positions[i3]) * 0.2; 
            positions[i3 + 2] += Math.cos(time * ((i % 3) + 1) + positions[i3+1]) * 0.15;
            if (positions[i3 + 1] < -1000 || positions[i3 + 1] > 1000) positions[i3 + 1] *= -0.95;
            if (positions[i3 + 2] < -1000 || positions[i3 + 2] > 1000) positions[i3 + 2] *= -0.95;
        }
        particles.attributes.position.needsUpdate = true;
        scene.rotation.y = time * 0.1; scene.rotation.x = time * 0.05;
        renderer.render(scene, camera);
    };
    const webGLSupported = (() => { try { const canvas = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))); } catch (e) { return false; } })();
    if (webGLSupported) { init(); animate(); } 
    else { console.warn("WebGL not supported. Skipping Three.js animation."); currentMount.style.backgroundImage = "url('/images/background.png')"; }
    return () => { 
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (currentMount && currentMount.handleMouseMove) { document.removeEventListener('mousemove', currentMount.handleMouseMove); }
        window.removeEventListener('resize', onWindowResize);
        if (renderer) { renderer.dispose(); if (renderer.domElement && currentMount && currentMount.contains(renderer.domElement)) { try { currentMount.removeChild(renderer.domElement); } catch(e) { /* ignore */ } } }
        clearInterval(interval);
    };
  }, [currentBg, heroImages.length]);

 

   return (
    <section
      id="hero-section"
      className="hero-section"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#121212",
      }}
    >
      {/* Background slider images */}
      <div className="hero-bg-slider">
        {heroImages.map((img, idx) => {
          if (idx !== currentBg && idx !== prevBg) return null;
          let className = "hero-bg-img";
          if (idx === currentBg && isSliding) className += " slide-in";
          else if (idx === prevBg && isSliding) className += " slide-out";
          else if (idx === currentBg) className += " active";
          return (
            <img
              key={img}
              src={img}
              alt=""
              className={className}
              style={{
                zIndex: idx === currentBg ? 2 : 1,
              }}
              draggable={false}
            />
          );
        })}
      </div>
       <div ref={mountRef} className="hero-canvas-container"></div>
      <div className="hero-overlay"></div>
      <div ref={heroContentRef} className="hero-content">
        <h1>Easterx Esports</h1>
        <p>Your Premier BGMI Tournament Organizers & Competitive Team in India!</p>
        <div className="hero-buttons">
          <button onClick={() => onNavLinkClick('#highlights')} className="btn"> Explore BGMI Tournaments </button>
          <button onClick={() => onNavLinkClick('#team-lineup')} className="btn btn-secondary"> Meet The Squad </button>
        </div>
      </div>
    </section>
  );
};

// --- Generic Section Component for Scroll Reveal ---
const Section = ({ id, children, title, className = '', titleClassName = '' }) => {
  const sectionRef = useRef(null);
  const { observeElement } = useScrollReveal(0.1); 

  useEffect(() => {
    if (sectionRef.current) {
      observeElement(sectionRef.current);
    }
  }, [observeElement]); 

  return (
    <section id={id} ref={sectionRef} className={cn("section reveal-on-scroll", className)}> 
      <div className="container">
        {title && <h2 className={cn("section-title", titleClassName)}>{title}</h2>}
        {children} 
      </div>
    </section>
  );
};

// --- Highlights Section Component ---
const HighlightsSection = ({ onNavLinkClick }) => {
  const highlightsData = [
    { icon: '/images/helmet.png', alt: 'BGMI Helmet Icon', title: 'Pro BGMI Scrims & Tourneys', description: 'Experience top-tier BGMI scrims, daily custom rooms, and participate in our flagship tournaments with exciting prize pools. Sharpen your skills against the best.', buttonText: 'Coming Soon', buttonLink: '#' },
    { icon: '/images/airdrop.png', alt: 'BGMI Airdrop Icon', title: 'Custom BGMI Lobbies', description: 'Join our custom BGMI lobbies for daily action, map rotations, and community games. Perfect for squads and solo players looking for consistent practice.', buttonText: 'Coming Soon', buttonLink: '#' },
    { icon: '/images/chicken.png', alt: 'BGMI Chicken Dinner Icon', title: 'Organize Your BGMI Event', description: 'Need a BGMI tournament organized? We provide end-to-end solutions from registrations, server hosting, live streaming, to prize distribution.', buttonText: 'Host With Us', buttonLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfBiqQ4n7pzzfy7LOkOFRXFlv9xrOKXiZJPgFE45G9xx5OWbw/viewform?usp=header' },
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
            style={{transitionDelay: `${index * 100}ms`}} 
          >
            <img 
              src={item.icon} 
              alt={item.alt} 
              className="icon" 
              onError={(e) => {e.target.onerror = null; e.target.src=`https://placehold.co/60x60/242424/00aaff?text=ICON${index+1}&font=roboto`;}}
            />
            <h3>{item.title}</h3>
            <p className="description">{item.description}</p>
            {item.buttonLink && item.buttonLink.startsWith('http') ? (
              <a href={item.buttonLink} target="_blank" rel="noopener noreferrer">
                <button className="btn">{item.buttonText}</button>
              </a>
            ) : (
              <button onClick={() => onNavLinkClick(item.buttonLink)} className="btn">
                {item.buttonText}
              </button>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};



// --- About Snippet Component ---
const AboutSnippet = ({ onNavLinkClick, navigateToPage }) => { 
  const { observeElement } = useScrollReveal(0.15); 
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if(contentRef.current) observeElement(contentRef.current);
    if(imageRef.current) observeElement(imageRef.current);
  }, [observeElement]);

  return (
    <Section id="about-snippet" className="bg-darker"> 
      <div className="about-snippet-container">
        <div ref={contentRef} className="about-snippet-content reveal-on-scroll"> 
          <h2 style={{textAlign: 'left', marginBottom: '20px'}}> 
            The Heart of BGMI Action: <span style={{color: 'var(--primary-color)'}}>Easterx Esports</span>
          </h2>
          <p>Easterx Esports is India's dedicated Battlegrounds Mobile India (BGMI) powerhouse...</p>
          <p>Whether you're aiming for the "Winner Winner Chicken Dinner"...</p>
          <button onClick={() => navigateToPage('bgmiJourney')} className="btn">
            Our BGMI Journey
          </button>
        </div>
        <div ref={imageRef} className="about-snippet-image reveal-on-scroll"> 
          <img 
            src="/images/team.png" 
            alt="Easterx Esports BGMI Team montage"
            onError={(e) => {e.target.onerror = null; e.target.src='https://placehold.co/500x350/121212/ffffff?text=BGMI+Team+Montage&font=orbitron';}}
          />
        </div>
      </div>
    </Section>
  );
};

// --- Team Lineup Component ---
const TeamLineup = () => {
  const teamMembers = [
    { id:'5166918930',name: 'easTeRxPriyank',ig: 'Priyank619_', role: 'Manager/ Assaulter', avatar: '/images/priyank.png' },
    { id:'5166931482',name: 'easTeRxPranay',ig: 'Pranay_ab17', role: 'In-Game Leader / Support', avatar: '/images/pranay.png' },
    { id:'5958582008',name: 'easTeRxShaniii',ig: 'i.am_shani_shrivastav', role: 'Entry Fragger', avatar: '/images/shani.png' },
    { id:'55542390783',name: 'easTeRxAnish',ig: '_anish_433', role: 'Support Assaulter', avatar: '/images/anish.png' },
    { id:'5274207839',name: 'easTeRxVasu',ig: 'moksha._.18', role: 'Support / Scout', avatar: '/images/vasu.png' },
    { id:'8568564564',name: 'easTeRxKrishna',ig: 'krishnaa_1312', role: 'Support / Freeman', avatar: '/images/krishna.png' },
  ];
  const { observeElement } = useScrollReveal(0.05);

  return (
    <Section id="team-lineup" title="Meet Our BGMI Squad" className="bg-lighter-surface">
      <div className="card-grid player-grid">
        {teamMembers.map((member, index) => (
          <div 
            key={member.name} 
            ref={el => el && observeElement(el)} 
            className="card player-card reveal-on-scroll" 
            style={{transitionDelay: `${index * 100}ms`}}
          >
            <img 
              src={member.avatar} 
              alt={`${member.name} - BGMI Player`} 
              className="player-avatar" 
              onError={(e) => {e.target.onerror = null; e.target.src=`https://placehold.co/150x150/242424/00aaff?text=${member.name.replace('easTeRx', '')}&font=orbitron`;}}
            />
            <h3>{member.name}</h3>
            <h4 className="player-id">
              <span className="player-id-label">ID:</span> {member.id}
            </h4>
           
            <p className="button">
              <a href={`https://www.instagram.com/${member.ig}`} target="_blank" rel="noopener noreferrer" className="btn">
                {member.ig ? `Follow @${member.ig}` : 'Instagram Not Available'}
              </a>
              
            </p>
            <p className="player-role">{member.role}</p>
            <p className="description">
              {member.name === 'easTeRxPriyank' ? 'Peak, spray, down — repeat"' : 
               member.name === 'easTeRxPranay' ? '"Others play the zone. I play the mind"' : 
               member.name === 'easTeRxShaniii' ? '"If there’s a first bullet, it’s mine"' : 
               member.name === 'easTeRxAnish' ? '"Their rush is loud. My cover is louder"' : 
               member.name === 'easTeRxVasu' ? 'They rotate blind — we rotate wise"' : 
               member.name === 'easTeRxKrishna' ? '"Not all heroes hold the highest kills — some hold the team"' : ''}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

// --- Footer Component ---
const Footer = () => { 
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { title: 'Discord', icon: '👾', href: 'https://discord.gg/YWgJJ4cSCa' },
    { title: 'YouTube', icon: '▶️', href: 'https://www.youtube.com/@easterx_esports' }, // Replace with actual link
    { title: 'Instagram', icon: '📸', href: 'https://www.instagram.com/easterx_esports?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <p>© {currentYear} Easterx Esports. All Rights Reserved.</p>
        <p>Your Ultimate Destination for Battlegrounds Mobile India Action.</p>
        <div className="social-links">
          {socialLinks.map(link => (
            <a 
              key={link.title} href={link.href} title={link.title} 
              target="_blank" rel="noopener noreferrer" aria-label={link.title}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---
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

  return (
    <>
      <GlobalStyles />
      {isAppLoading && <Preloader />}
      <div className={cn("app-container", isAppLoading && "loading")}>
        <Navbar 
            onNavLinkClick={handleNavLinkClick} 
            navigateToPage={navigateTo}
            currentPage={currentPage} 
        />
        <main>
          {currentPage === 'home' ? (
            <>
              <Hero onNavLinkClick={handleNavLinkClick} />
              <HighlightsSection onNavLinkClick={handleNavLinkClick} />
              <AboutSnippet onNavLinkClick={handleNavLinkClick} navigateToPage={navigateTo} />
              <TeamLineup />
            </>
          ) : currentPage === 'bgmiJourney' ? (
            <BgmiJourneyPage navigateToPage={navigateTo} />
          ) : currentPage === 'gallery' ? ( // Added Gallery Page routing
            <GalleryPage navigateToPage={navigateTo} />
          ) : (
            <div className="container" style={{padding: "50px 0", textAlign: "center"}}>Error: Page not found.</div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
