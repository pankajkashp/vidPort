// src/components/hero/HeroText.jsx
import { useEffect, useRef } from 'react';
import { gsap } from '../../animations/gsap.js';
import { splitText } from '../../animations/splitText.js';
import { SITE_CONFIG } from '../../utils/constants.js';

const HeroText = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const metaRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      // Label
      if (labelRef.current) {
        tl.from(labelRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, 0);
      }

      // Split and animate main title words
      if (titleRef.current) {
        const { words } = splitText(titleRef.current, { type: 'words' });
        if (words.length > 0) {
          tl.from(words, {
            y: '110%',
            duration: 1.1,
            ease: 'power4.out',
            stagger: 0.08,
          }, 0.1);
        }
      }

      // Subtitle fade in
      if (subtitleRef.current) {
        tl.from(subtitleRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
        }, 0.7);
      }

      // Stats
      if (metaRef.current) {
        const statItems = metaRef.current.querySelectorAll('.stat-item');
        if (statItems.length > 0) {
          tl.from(statItems, {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power3.out',
          }, 1.0);
        }
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative z-20 flex flex-col justify-center min-h-screen px-6 md:px-12 lg:px-20 pt-24">
      {/* Label */}
      <div ref={labelRef} className="section-label mb-6">
        Video Editor &amp; AI Filmmaker
      </div>

      {/* Main title */}
      <div className="overflow-hidden max-w-5xl">
        <h1
          ref={titleRef}
          className="font-display text-[3.5rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[11rem] leading-[0.88] text-white"
          style={{ fontFamily: '"Bebas Neue", Arial, cursive' }}
        >
          {SITE_CONFIG.tagline}
        </h1>
      </div>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        className="mt-8 text-base md:text-lg text-white/50 max-w-md leading-relaxed"
        style={{ opacity: 0 }}
      >
        Premium video editing, AI filmmaking, and cinematic storytelling for brands, agencies, and
        productions worldwide.
      </p>

      {/* Stats */}
      <div ref={metaRef} className="flex flex-wrap items-center gap-6 mt-8">
        {Object.entries(SITE_CONFIG.stats).map(([key, val]) => (
          <div key={key} className="stat-item flex flex-col" style={{ opacity: 0 }}>
            <span
              className="text-3xl leading-none text-accent font-bold"
              style={{ fontFamily: '"Bebas Neue", Arial, cursive' }}
            >
              {val}
            </span>
            <span className="text-xs text-white/30 uppercase tracking-widest capitalize mt-1">
              {key === 'experience' ? 'Years Exp.' : key}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroText;
