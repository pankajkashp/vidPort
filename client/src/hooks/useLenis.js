// src/hooks/useLenis.js
// Lenis smooth scroll initialization hook

import { useEffect, useRef } from 'react';
import { ScrollTrigger } from '../animations/gsap.js';

let lenisInstance = null;

export const useLenis = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    let lenis;

    const initLenis = async () => {
      try {
        // Dynamic import handles different lenis export formats
        const LenisModule = await import('lenis');
        const Lenis = LenisModule.default || LenisModule.Lenis || LenisModule;

        lenis = new Lenis({
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.8,
          touchMultiplier: 1.5,
        });

        lenisRef.current = lenis;
        lenisInstance = lenis;

        // Connect Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // RAF loop
        const raf = (time) => {
          lenis.raf(time);
          rafIdRef.current = requestAnimationFrame(raf);
        };
        rafIdRef.current = requestAnimationFrame(raf);
      } catch (err) {
        console.warn('Lenis init failed, using default scroll:', err);
      }
    };

    const rafIdRef = { current: null };
    initLenis();

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (lenis) lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return lenisRef;
};

export const getLenis = () => lenisInstance;

export default useLenis;
