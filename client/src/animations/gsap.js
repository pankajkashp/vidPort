// src/animations/gsap.js
// Central GSAP configuration and initialization

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

// Register all plugins
gsap.registerPlugin(ScrollTrigger, Flip);

// ScrollTrigger defaults
ScrollTrigger.defaults({
  toggleActions: 'play none none none',
});

export { gsap, ScrollTrigger, Flip };

// --- Animation Presets ---

/**
 * Fade in from below
 */
export const fadeInUp = (targets, options = {}) => {
  return gsap.from(targets, {
    y: options.y || 60,
    opacity: 0,
    duration: options.duration || 1,
    ease: options.ease || 'power3.out',
    stagger: options.stagger || 0,
    delay: options.delay || 0,
    ...options,
  });
};

/**
 * Fade in from above
 */
export const fadeInDown = (targets, options = {}) => {
  return gsap.from(targets, {
    y: options.y || -60,
    opacity: 0,
    duration: options.duration || 1,
    ease: options.ease || 'power3.out',
    stagger: options.stagger || 0,
    ...options,
  });
};

/**
 * Scale in reveal
 */
export const scaleIn = (targets, options = {}) => {
  return gsap.from(targets, {
    scale: options.scale || 0.8,
    opacity: 0,
    duration: options.duration || 1.2,
    ease: options.ease || 'power4.inOut',
    stagger: options.stagger || 0,
    ...options,
  });
};

/**
 * Clip path reveal (bottom to top)
 */
export const clipReveal = (targets, options = {}) => {
  return gsap.from(targets, {
    clipPath: 'inset(100% 0% 0% 0%)',
    duration: options.duration || 1.2,
    ease: options.ease || 'power4.inOut',
    stagger: options.stagger || 0.1,
    ...options,
  });
};

/**
 * Create a ScrollTrigger animation
 */
export const createScrollAnimation = (trigger, targets, fromVars, options = {}) => {
  return gsap.from(targets, {
    ...fromVars,
    scrollTrigger: {
      trigger: trigger,
      start: options.start || 'top 85%',
      end: options.end || 'bottom 20%',
      toggleActions: options.toggleActions || 'play none none none',
      ...options.scrollTrigger,
    },
  });
};

/**
 * Staggered card reveal
 */
export const staggerReveal = (cards, options = {}) => {
  return gsap.from(cards, {
    y: options.y || 80,
    opacity: 0,
    duration: options.duration || 0.8,
    ease: 'power3.out',
    stagger: {
      amount: options.staggerAmount || 0.6,
      from: options.staggerFrom || 'start',
    },
    scrollTrigger: options.scrollTrigger || null,
  });
};

/**
 * Magnetic button strength calculation
 */
export const getMagneticStrength = (mouseX, mouseY, rect, strength = 0.35) => {
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const deltaX = mouseX - centerX;
  const deltaY = mouseY - centerY;
  return {
    x: deltaX * strength,
    y: deltaY * strength,
  };
};

export default gsap;
