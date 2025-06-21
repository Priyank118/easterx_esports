import React from 'react';

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

export default Preloader;