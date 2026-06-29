// src/components/layout/Footer/Footer.jsx
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../../../animations/gsap.js';
import { SITE_CONFIG } from '../../../utils/constants.js';

const SocialIcon = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent/50 transition-all duration-300"
  >
    {children}
  </a>
);

const Footer = () => {
  const footerRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-item', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer ref={footerRef} className="border-t border-white/[0.06] bg-bg-secondary">
      {/* Big CTA */}
      <div className="section-container py-24 text-center">
        <p className="footer-item section-label justify-center mb-6">Let's Create Together</p>
        <h2 className="footer-item font-display text-6xl md:text-8xl lg:text-[10rem] leading-none text-white/90 mb-8">
          READY TO
          <span className="gradient-text-blue"> TELL</span>
          <br />
          YOUR STORY?
        </h2>
        <div className="footer-item flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
          <Link to="/contact" className="btn-primary px-8 py-4 text-sm">
            Start a Project
          </Link>
          <a href={`mailto:${SITE_CONFIG.email}`} className="btn-outline px-8 py-4 text-sm">
            {SITE_CONFIG.email}
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/[0.04]">
        <div className="section-container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="footer-item flex items-center gap-3">
            <div className="w-7 h-7 rounded border border-accent/50 flex items-center justify-center">
              <span className="text-accent font-display text-sm">A</span>
            </div>
            <span className="text-white/40 text-sm font-satoshi">
              {SITE_CONFIG.name} — {SITE_CONFIG.title}
            </span>
          </div>

          {/* Socials */}
          <div className="footer-item flex items-center gap-3">
            <SocialIcon href={SITE_CONFIG.socials.instagram} label="Instagram">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </SocialIcon>
            <SocialIcon href={SITE_CONFIG.socials.youtube} label="YouTube">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
              </svg>
            </SocialIcon>
            <SocialIcon href={SITE_CONFIG.socials.linkedin} label="LinkedIn">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </SocialIcon>
            <SocialIcon href={SITE_CONFIG.socials.vimeo} label="Vimeo">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.48 4.807l-.001.005z"/>
              </svg>
            </SocialIcon>
          </div>

          {/* Copyright */}
          <p className="footer-item text-white/25 text-xs font-satoshi">
            © {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
