import React, { useEffect, useRef } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import { cn } from '../../utils/cn';

const Section = ({ id, children, title, className = '', titleClassName = '' }) => {
    const sectionRef = useRef(null);
    const { observeElement } = useScrollReveal(0.1);

    useEffect(() => {
        if (sectionRef.current) {
            observeElement(sectionRef.current);
        }
    }, [observeElement]);

    return (
        <section id={id} ref={sectionRef} className={cn("section", "reveal-on-scroll", className)}>
            <div className="container">
                {title && <h2 className={cn("section-title", titleClassName)}>{title}</h2>}
                {children}
            </div>
        </section>
    );
};

export default Section;