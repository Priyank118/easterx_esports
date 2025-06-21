import { useEffect, useRef } from 'react';

const useScrollReveal = (threshold = 0.1) => {
    const observerRef = useRef(null);

     useEffect(() => {
    const currentObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // ONCE IT'S REVEALED, STOP WATCHING IT.
            currentObserver.unobserve(entry.target);
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
    // Add a small delay to ensure the browser has painted the element
    setTimeout(() => {
      observerRef.current.observe(element);
    }, 100); // 100 milliseconds is usually more than enough
  }
};

    return { observeElement };
};

export default useScrollReveal;
