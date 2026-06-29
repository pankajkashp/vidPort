// src/components/layout/Navbar/Navbar.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from '../../../animations/gsap.js';
import { NAV_LINKS, SITE_CONFIG } from '../../../utils/constants.js';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const location = useLocation();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Mobile menu animation
  useEffect(() => {
    if (!menuRef.current) return;
    const menuItems = menuRef.current.querySelectorAll('.menu-item');

    if (menuOpen) {
      gsap.to(menuRef.current, { opacity: 1, visibility: 'visible', duration: 0.3 });
      gsap.from(menuItems, {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
      });
    } else {
      gsap.to(menuRef.current, { opacity: 0, visibility: 'hidden', duration: 0.3 });
    }
  }, [menuOpen]);

  const handleNavClick = (href) => {
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-600 ${
          scrolled ? 'glass py-3' : 'py-6 bg-transparent'
        }`}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="w-8 h-8 rounded-md border border-accent flex items-center justify-center glow-accent">
              <span className="text-accent font-display text-lg">A</span>
            </div>
            <span className="font-satoshi font-semibold text-sm tracking-wide text-white/90">
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => handleNavClick(link.href)}
                className="relative text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            <a
              href={SITE_CONFIG.resume}
              download
              className="btn-primary text-xs px-5 py-2.5 rounded-full"
            >
              Download CV
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-none"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-px w-6 bg-white transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block h-px w-4 bg-white/50 transition-all duration-300 ${
                menuOpen ? 'opacity-0 w-0' : ''
              }`}
            />
            <span
              className={`block h-px w-6 bg-white transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Full-screen Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[99] glass-dark flex flex-col items-center justify-center md:hidden"
        style={{ opacity: 0, visibility: 'hidden' }}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            onClick={() => { handleNavClick(link.href); setMenuOpen(false); }}
            className="menu-item text-5xl font-display text-white/80 hover:text-accent transition-colors duration-300 py-4 tracking-widest"
          >
            {link.label.toUpperCase()}
          </Link>
        ))}
        <div className="menu-item mt-10">
          <a href={SITE_CONFIG.resume} download className="btn-outline">
            Download CV
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
