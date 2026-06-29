// src/animations/splitText.js
// Custom SplitText implementation (GSAP Club-free)

/**
 * Split element's text content into spans for animation
 * @param {HTMLElement} element
 * @param {Object} options - { type: 'words' | 'chars' | 'lines', className: string }
 * @returns {{ words: HTMLElement[], chars: HTMLElement[], revert: Function }}
 */
export const splitText = (element, options = {}) => {
  if (!element) return { words: [], chars: [], revert: () => {} };

  const type = options.type || 'words';
  const wordClass = options.wordClass || 'split-word';
  const charClass = options.charClass || 'split-char';
  const originalHTML = element.innerHTML;
  const text = (element.textContent || '').trim();

  if (!text) return { words: [], chars: [], revert: () => {} };

  const words = [];
  const chars = [];

  if (type === 'chars' || type === 'words') {
    const text = element.textContent || '';
    element.innerHTML = '';

    text.split(' ').forEach((word, wi) => {
      // Word wrapper
      const wordSpan = document.createElement('span');
      wordSpan.classList.add(wordClass);
      wordSpan.style.display = 'inline-block';
      wordSpan.style.overflow = 'hidden';
      wordSpan.style.verticalAlign = 'bottom';

      if (type === 'chars') {
        // Inner span for clip animation
        word.split('').forEach((char) => {
          const charSpan = document.createElement('span');
          charSpan.classList.add(charClass);
          charSpan.style.display = 'inline-block';
          charSpan.textContent = char;
          wordSpan.appendChild(charSpan);
          chars.push(charSpan);
        });
      } else {
        // Word-level inner span for clip
        const innerSpan = document.createElement('span');
        innerSpan.classList.add(`${wordClass}__inner`);
        innerSpan.style.display = 'inline-block';
        innerSpan.textContent = word;
        wordSpan.appendChild(innerSpan);
        words.push(innerSpan);
      }

      element.appendChild(wordSpan);

      // Add space between words
      if (wi < text.split(' ').length - 1) {
        element.appendChild(document.createTextNode(' '));
      }
    });
  }

  const revert = () => {
    element.innerHTML = originalHTML;
  };

  return { words, chars, revert };
};

/**
 * Animate words into view with a clip-path reveal
 * Uses gsap imported externally to avoid circular deps
 */
export const animateWords = (gsap, words, options = {}) => {
  return gsap.from(words, {
    y: options.y || '110%',
    opacity: options.opacity !== undefined ? options.opacity : 1,
    duration: options.duration || 1,
    ease: options.ease || 'power4.out',
    stagger: options.stagger || 0.06,
    delay: options.delay || 0,
  });
};

/**
 * Animate characters
 */
export const animateChars = (gsap, chars, options = {}) => {
  return gsap.from(chars, {
    y: options.y || '120%',
    opacity: options.opacity !== undefined ? options.opacity : 1,
    rotateX: options.rotateX || -90,
    duration: options.duration || 0.8,
    ease: options.ease || 'back.out(1.7)',
    stagger: options.stagger || 0.03,
    delay: options.delay || 0,
    transformOrigin: 'center bottom',
  });
};
