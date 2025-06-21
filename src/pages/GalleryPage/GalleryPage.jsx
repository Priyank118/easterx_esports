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

    const renderImageGrid = (images) => (
        <div className="gallery-grid">
            {images.map((image, index) => (
                <div
                    key={image.id}
                   
                    style={{ transitionDelay: `${index * 75}ms` }}
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
            <h2 ref={pageTitleRef} 
                <span className="emoji-title-anim">🖼️</span> Event Gallery
            </h2>

            <section className="gallery-event-section">
                <h3 ref={section2k24TitleRef} 
                    Citronics 2K24 Highlights
                </h3>
                {renderImageGrid(citronics2k24Images)}
            </section>

            <section className="gallery-event-section">
                <h3 ref={section2k25TitleRef}  style={{ transitionDelay: '0.2s' }}>
                    Citronics 2K25 Showcase
                </h3>
                {renderImageGrid(citronics2k25Images)}
            </section>

            <div ref={backButtonRef}  style={{ textAlign: 'center', marginTop: '40px', marginBottom: '40px', transitionDelay: '0.3s' }}>
                <button className="btn btn-secondary" onClick={() => navigateToPage('home')}>Back to Home</button>
            </div>
        </div>
    );
}

export default GalleryPage;
