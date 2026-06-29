// src/animations/transitions.js
// Page transition animations using GSAP

import gsap from './gsap.js';

/**
 * Page enter animation - content reveals upward
 */
export const pageEnter = (container) => {
  return gsap.from(container, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
  });
};

/**
 * Page exit animation - content fades and moves up
 */
export const pageExit = (container) => {
  return gsap.to(container, {
    opacity: 0,
    y: -30,
    duration: 0.5,
    ease: 'power3.in',
  });
};

/**
 * Section reveal - for sections entering viewport
 */
export const sectionReveal = (element, options = {}) => {
  return gsap.from(element, {
    opacity: 0,
    y: options.y || 50,
    duration: options.duration || 1,
    ease: 'power3.out',
    delay: options.delay || 0,
    scrollTrigger: options.scrollTrigger,
  });
};

/**
 * Loader exit animation
 */
export const loaderExit = (loaderEl, onComplete) => {
  return gsap.to(loaderEl, {
    yPercent: -100,
    duration: 1.2,
    ease: 'power4.inOut',
    delay: 0.3,
    onComplete,
  });
};

/**
 * Image/video reveal with clip path
 */
export const mediaReveal = (element, options = {}) => {
  return gsap.from(element, {
    clipPath: 'inset(100% 0% 0% 0%)',
    duration: options.duration || 1.4,
    ease: 'power4.inOut',
    scrollTrigger: options.scrollTrigger,
  });
};

/**
 * Counter animation
 */
export const animateCounter = (element, target, options = {}) => {
  const obj = { value: 0 };
  return gsap.to(obj, {
    value: target,
    duration: options.duration || 2,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.value) + (options.suffix || '');
    },
    scrollTrigger: options.scrollTrigger,
  });
};
