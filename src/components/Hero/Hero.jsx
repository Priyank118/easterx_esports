import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

const Hero = ({ onNavLinkClick }) => {
    const mountRef = useRef(null);
    const heroContentRef = useRef(null);

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

        const interval = setInterval(() => {
            setPrevBg(currentBg);
            setIsSliding(true);
            setTimeout(() => {
                setCurrentBg((prev) => (prev + 1) % heroImages.length);
                setTimeout(() => setIsSliding(false), 700);
            }, 20);
        }, 3000);

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
                positions[i3 + 2] += Math.cos(time * ((i % 3) + 1) + positions[i3 + 1]) * 0.15;
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
            clearInterval(interval);
            if(particleMaterial) particleMaterial.dispose();
            if(particles) particles.dispose();
            if (renderer) {
                 renderer.dispose(); 
                 if (renderer.domElement && currentMount && currentMount.contains(renderer.domElement)) { 
                     try { currentMount.removeChild(renderer.domElement); } catch(e) { /* ignore */ } 
                }
            }
        };
    }, []); // Removed dependencies to avoid re-triggering on state change

    return (
        <section
            id="hero-section"
            className="hero-section"
        >
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
                            style={{ zIndex: idx === currentBg ? 2 : 1 }}
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
                    <button onClick={() => onNavLinkClick('#highlights')} className="btn"> Explore Events </button>
                    <button onClick={() => onNavLinkClick('#team-lineup')} className="btn btn-secondary"> Meet The Squad </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;