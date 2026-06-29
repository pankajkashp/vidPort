// src/hooks/useCursor.js
// Custom cursor state and position tracking hook

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from '../animations/gsap.js';

export const useCursor = () => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [cursorType, setCursorType] = useState('default');

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Inner dot follows immediately
      gsap.to(inner, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'none',
      });

      // Outer ring follows with lag
      gsap.to(outer, {
        x: mouseX,
        y: mouseY,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    const onMouseEnter = () => {
      gsap.to([outer, inner], { opacity: 1, duration: 0.3 });
    };

    const onMouseLeave = () => {
      gsap.to([outer, inner], { opacity: 0, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    // Handle hoverable elements
    const handleLinkEnter = () => setCursorType('link');
    const handleLinkLeave = () => setCursorType('default');
    const handleVideoEnter = () => setCursorType('video');
    const handleVideoLeave = () => setCursorType('default');

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-cursor="link"]').forEach((el) => {
        el.addEventListener('mouseenter', handleLinkEnter);
        el.addEventListener('mouseleave', handleLinkLeave);
      });

      document.querySelectorAll('[data-cursor="video"], video').forEach((el) => {
        el.addEventListener('mouseenter', handleVideoEnter);
        el.addEventListener('mouseleave', handleVideoLeave);
      });
    };

    // Run on next tick to allow DOM to mount
    const timeout = setTimeout(addListeners, 500);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const setCursor = useCallback((type) => setCursorType(type), []);

  return { outerRef, innerRef, cursorType, setCursor };
};

export default useCursor;
