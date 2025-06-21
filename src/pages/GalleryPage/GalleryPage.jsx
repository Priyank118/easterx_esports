import React, { useEffect, useRef } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';

const GalleryPage = ({ navigateToPage }) => {
    const { observeElement } = useScrollReveal(0.1);

    const generatePlaceholders = (eventName, folderName, imageBaseName, count, extension = 'jpg') => {
        return Array.from({ length: count }, (_, i) => ({
            id: `${eventName.replace(/\s+/g, '-')}-img-${i + 1}`,
            src: `/images/${folderName}/${imageBaseName}${i + 1}.${extension}`,
            alt: `${eventName}`,
            eventName: eventName
        }));
    };

    const citronics2k24Images = generatePlaceholders("Citronics 2K24", "citronics2k24", "pic", 12, "jpg");
    const citronics2k25Images = generatePlaceholders("Citronics 2K25", "citronics2k25", "pic", 12, "jpg");

    // Refs for the sections we want to animate
    const pageTitleRef = useRef(null);
    const section2k24Ref = useRef(null);
    const section2k25Ref = useRef(null);
    const backButtonRef = useRef(null);

    useEffect(() => {
        if (pageTitleRef.current) observeElement(pageTitleRef.current);
        if (section2k24Ref.current) observeElement(section2k24Ref.current);
        if (section2k25Ref.current) observeElement(section2k25Ref.current);
        if (backButtonRef.current) observeElement(backButtonRef.current);
    }, [observeElement]);

    // This function is now much simpler. No refs or styles needed here.
    const renderImageGrid = (images) => (
        <div className="gallery-grid">
            {images.map((image) => (
                <div
                    key={image.id}
                    className="gallery-image-placeholder-wrapper"
                >
                    <img
                        src={image.src}
                        alt={image.alt}
                        className="gallery-image"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://placehold.co/400x300/121212/e0e0e0?text=Image+Missing&font=sans-serif`;
                        }}
                    />
                    <div className="gallery-image-overlay">
                        <p>{image.eventName}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="container gallery-page-container">
            <h2 ref={pageTitleRef} className="gallery-page-title reveal-on-scroll">
                <span className="emoji-title-anim">🖼️</span> Event Gallery
            </h2>

            {/* We apply the reveal logic to the parent section */}
            <section ref={section2k24Ref} className="gallery-event-section reveal-on-scroll">
                <h3 className="gallery-section-title">
                    Citronics 2K24 Highlights
                </h3>
                {renderImageGrid(citronics2k24Images)}
            </section>

            {/* We apply the reveal logic to the parent section */}
            <section ref={section2k25Ref} className="gallery-event-section reveal-on-scroll" style={{ transitionDelay: '0.2s' }}>
                <h3 className="gallery-section-title">
                    Citronics 2K25 Showcase
                </h3>
                {renderImageGrid(citronics2k25Images)}
            </section>

            <div ref={backButtonRef} className="reveal-on-scroll" style={{ textAlign: 'center', marginTop: '40px', marginBottom: '40px', transitionDelay: '0.3s' }}>
                <button className="btn btn-secondary" onClick={() => navigateToPage('home')}>Back to Home</button>
            </div>
        </div>
    );
}

export default GalleryPage;
