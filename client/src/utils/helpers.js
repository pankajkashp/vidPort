// src/utils/helpers.js

/**
 * Clamp a number between min and max
 */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * Linear interpolation
 */
export const lerp = (start, end, factor) => start + (end - start) * factor;

/**
 * Map a value from one range to another
 */
export const mapRange = (value, inMin, inMax, outMin, outMax) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

/**
 * Debounce a function
 */
export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Format a number with leading zero (e.g. 1 → "01")
 */
export const padZero = (n) => String(n).padStart(2, '0');

/**
 * Filter projects by category
 */
export const filterByCategory = (projects, category) => {
  if (category === 'All') return projects;
  return projects.filter((p) => p.category === category);
};

/**
 * Get featured projects
 */
export const getFeaturedProjects = (projects) => {
  return projects.filter((p) => p.featured);
};

/**
 * Get related projects (same category, excluding current)
 */
export const getRelatedProjects = (projects, currentId, category, limit = 3) => {
  return projects
    .filter((p) => p.id !== currentId && p.category === category)
    .slice(0, limit);
};

/**
 * Split text into words/chars for animation
 */
export const splitIntoWords = (text) => text.split(' ');
export const splitIntoChars = (text) => text.split('');

/**
 * Check if device is mobile
 */
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768;
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get mouse position relative to element center
 */
export const getMouseOffset = (event, element) => {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  return {
    x: event.clientX - centerX,
    y: event.clientY - centerY,
  };
};

/**
 * Format video duration display
 */
export const formatDuration = (duration) => {
  if (!duration || duration === 'Varies') return duration;
  return duration;
};

/**
 * Truncate text to max length
 */
export const truncate = (text, maxLength = 120) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};
