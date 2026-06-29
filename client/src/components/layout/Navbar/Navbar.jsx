// src/components/layout/Navbar/Navbar.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from '../../../animations/gsap.js';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const ctaRef = useRef(null);
  
  // Handle scroll state for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Magnetic hover effect for CTA button
  useEffect(() => {
    const btn = ctaRef.current;
    if (!btn) return;

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const h = rect.width / 2;
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - h;

      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: 'power3.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Nav links configuration
  const navLinks = [
    { name: 'Work', path: '/projects' },
    { name: 'AI Projects', path: '/projects?filter=ai' },
    { name: 'Commercials', path: '/projects?filter=commercial' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full h-[80px] z-[100] transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-black/70 backdrop-blur-xl border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
            : 'bg-black/40 backdrop-blur-md border-transparent'
        }`}
      >
        <div className="w-full h-full px-6 md:px-12 flex items-center justify-between">
          
          {/* LEFT: Logo & Brand */}
          <div className="flex-1 flex items-center justify-start">
            <Link 
              to="/" 
              className="group flex items-center gap-3 cursor-none"
              data-cursor="pointer"
            >
              <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-display text-xl leading-none pt-1 overflow-hidden" style={{ fontFamily: '"Bebas Neue", cursive' }}>
                <span className="group-hover:-translate-y-full transition-transform duration-300 block">A</span>
                <span className="absolute translate-y-full group-hover:translate-y-0 transition-transform duration-300 block text-accent">A</span>
              </div>
              <span className="font-display text-2xl tracking-widest text-white mt-1" style={{ fontFamily: '"Bebas Neue", cursive' }}>
                ALEX RAY
              </span>
            </Link>
          </div>

          {/* CENTER: Navigation Links (Desktop) */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="group relative px-2 py-1 cursor-none flex flex-col items-center justify-center text-sm font-satoshi"
                  data-cursor="pointer"
                >
                  <span className={`transition-colors duration-300 group-hover:-translate-y-1 block ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                    {link.name}
                  </span>
                  {/* Animated underline */}
                  <span className={`absolute bottom-0 left-0 h-[1px] bg-accent transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              );
            })}
          </div>

          {/* RIGHT: Contact & CTA */}
          <div className="flex-1 flex items-center justify-end gap-6">
            <Link 
              to="/contact" 
              className="hidden md:block text-sm font-satoshi text-white/60 hover:text-white transition-colors cursor-none hover:-translate-y-1 duration-300"
              data-cursor="pointer"
            >
              Contact
            </Link>
            
            <a 
              ref={ctaRef}
              href="/resume.pdf" 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:flex items-center justify-center px-6 h-10 rounded bg-white text-black font-satoshi text-sm font-medium transition-colors hover:bg-gray-200 cursor-none"
              data-cursor="pointer"
            >
              Download CV
            </a>

            {/* Mobile Hamburger Toggle */}
            <button 
              className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 z-[110] relative cursor-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-cursor="pointer"
            >
              <span className={`w-6 h-[2px] bg-white transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
              <span className={`w-6 h-[2px] bg-white transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-[2px] bg-white transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-0 bg-black/95 backdrop-blur-2xl z-[105] lg:hidden flex flex-col justify-center px-12 transition-all duration-500 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-5xl text-white tracking-wider"
              style={{ fontFamily: '"Bebas Neue", cursive', transitionDelay: `${i * 0.05}s`, transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)', opacity: mobileMenuOpen ? 1 : 0, transition: 'all 0.4s ease-out' }}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px w-full bg-white/10 my-4" />
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="font-display text-4xl text-accent tracking-wider"
            style={{ fontFamily: '"Bebas Neue", cursive' }}
          >
            Contact
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="w-full text-center py-4 border border-white/20 text-white font-satoshi text-sm rounded mt-4"
          >
            Download CV
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
