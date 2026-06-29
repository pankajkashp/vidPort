// src/pages/Contact.jsx
import { useEffect, useRef } from 'react';
import { gsap } from '../animations/gsap.js';
import ContactForm from '../components/contact/ContactForm.jsx';
import SocialLinks from '../components/contact/SocialLinks.jsx';
import { SITE_CONFIG } from '../utils/constants.js';

const Contact = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-head', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-bg-primary min-h-screen pt-32 pb-24">
      <div className="section-container">
        {/* Header */}
        <header ref={headerRef} className="mb-20">
          <p className="contact-head section-label">Get In Touch</p>
          <h1
            className="contact-head font-display text-6xl md:text-8xl lg:text-[9rem] text-white leading-none"
            style={{ fontFamily: '"Bebas Neue", cursive' }}
          >
            LET'S
            <span className="gradient-text-blue ml-4">WORK</span>
            <br />
            TOGETHER
          </h1>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left — Form */}
          <div className="lg:col-span-7">
            <p className="text-white/40 font-satoshi text-sm leading-relaxed mb-10 max-w-md">
              Have a project in mind? I'd love to hear about it. Fill out the form below and I'll get back to you within 24 hours.
            </p>
            <ContactForm />
          </div>

          {/* Right — Info */}
          <div className="lg:col-span-5 space-y-10">
            {/* Direct contact */}
            <div>
              <p className="text-white/25 text-xs uppercase tracking-widest font-satoshi mb-4">Direct Contact</p>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="block font-satoshi font-semibold text-white text-lg hover:text-accent transition-colors duration-300 mb-2 cursor-none"
              >
                {SITE_CONFIG.email}
              </a>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="block font-satoshi text-white/40 text-sm hover:text-white transition-colors duration-300 cursor-none"
              >
                {SITE_CONFIG.phone}
              </a>
            </div>

            {/* Location */}
            <div>
              <p className="text-white/25 text-xs uppercase tracking-widest font-satoshi mb-2">Based In</p>
              <p className="font-satoshi text-white font-medium">{SITE_CONFIG.location}</p>
              <p className="font-satoshi text-white/30 text-sm">Available for remote work worldwide</p>
            </div>

            {/* Resume download */}
            <div className="pt-2">
              <a
                href={SITE_CONFIG.resume}
                download
                className="btn-outline w-full justify-center py-4 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.06]" />

            {/* Social links */}
            <div>
              <p className="text-white/25 text-xs uppercase tracking-widest font-satoshi mb-4">Follow My Work</p>
              <SocialLinks />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
