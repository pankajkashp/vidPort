// src/hooks/useScrollTrigger.js
// Reusable ScrollTrigger integration hook

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../animations/gsap.js';

/**
 * Hook that creates a ScrollTrigger animation on an element
 * @param {Function} animationFactory - receives (element, gsap, ScrollTrigger) and returns a gsap tween/timeline
 * @param {Array} deps - additional dependencies
 */
export const useGsapScrollTrigger = (animationFactory, deps = []) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      animationFactory(ref.current, gsap, ScrollTrigger);
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
};

/**
 * Simple fade in from bottom on scroll
 */
export const useFadeInOnScroll = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: options.y || 50,
        opacity: 0,
        duration: options.duration || 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: options.start || 'top 85%',
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
};

/**
 * Stagger children on scroll
 */
export const useStaggerOnScroll = (childSelector = '.stagger-item', options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const items = ref.current.querySelectorAll(childSelector);
      if (!items.length) return;

      gsap.from(items, {
        y: options.y || 60,
        opacity: 0,
        duration: options.duration || 0.8,
        ease: 'power3.out',
        stagger: options.stagger || 0.12,
        scrollTrigger: {
          trigger: ref.current,
          start: options.start || 'top 80%',
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
};

export default useGsapScrollTrigger;
