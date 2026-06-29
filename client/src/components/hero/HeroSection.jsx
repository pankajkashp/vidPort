// src/components/hero/HeroSection.jsx
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../animations/gsap.js';
import HeroVideo from './HeroVideo.jsx';
import HeroText from './HeroText.jsx';
import CTAButton from './CTAButton.jsx';

const ScrollIndicator = () => (
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
    <span className="text-white/25 text-[0.6rem] tracking-[0.3em] uppercase font-satoshi">
      Scroll
    </span>
    <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 h-4 bg-accent"
        style={{ animation: 'scrollLine 1.5s ease-in-out infinite' }}
      />
    </div>
    <style>{`
      @keyframes scrollLine {
        0% { transform: translateY(-100%); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateY(300%); opacity: 0; }
      }
    `}</style>
  </div>
);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CTA buttons appear
      gsap.from(ctaRef.current?.children || [], {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen overflow-hidden bg-bg-primary"
    >
      {/* Background video */}
      <HeroVideo />

      {/* Hero text */}
      <HeroText />

      {/* CTA buttons */}
      <div
        ref={ctaRef}
        className="absolute bottom-24 left-6 md:left-12 lg:left-20 z-20 flex flex-wrap gap-4"
      >
        <CTAButton
          href="#reel"
          variant="primary"
          onClick={() => {
            document.getElementById('reel')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          Watch Reel
        </CTAButton>

        <CTAButton
          variant="outline"
          onClick={() => {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          View Projects
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </CTAButton>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Bottom gradient blend */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg-primary to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
