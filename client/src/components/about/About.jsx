// src/components/about/About.jsx
import { useRef, useEffect } from 'react';
import { gsap } from '../../animations/gsap.js';
import { splitText } from '../../animations/splitText.js';
import { animateCounter } from '../../animations/transitions.js';
import { SITE_CONFIG } from '../../utils/constants.js';

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      // Image reveal
      tl.from(imgRef.current, {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.4,
        ease: 'power4.out',
      }, 0);

      // Heading words
      if (titleRef.current) {
        const { words } = splitText(titleRef.current, { type: 'words' });
        if (words.length > 0) {
          tl.from(words, {
            y: '110%',
            duration: 1,
            ease: 'power4.out',
            stagger: 0.07,
          }, 0.2);
        }
      }

      // Body text
      tl.from('.about-body', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      }, 0.6);

      // Counters — scoped to sectionRef
      const counterEls = sectionRef.current?.querySelectorAll('.counter-val') || [];
      counterEls.forEach((el) => {
        const target = parseInt(el.dataset.target) || 0;
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, {
          suffix,
          duration: 2,
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-36 bg-bg-secondary overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Text */}
          <div>
            <p className="about-body section-label">About Me</p>

            <div className="clip-reveal overflow-hidden mb-6">
              <h2
                ref={titleRef}
                className="font-display text-5xl md:text-7xl text-white leading-none"
                style={{ fontFamily: '"Bebas Neue", cursive' }}
              >
                VISUAL STORYTELLER & CREATIVE DIRECTOR
              </h2>
            </div>

            <p className="about-body text-white/50 font-satoshi text-base leading-relaxed mb-4">
              I'm <span className="text-white font-semibold">{SITE_CONFIG.name}</span>, a video editor and AI filmmaker based in {SITE_CONFIG.location} with over {SITE_CONFIG.stats.experience} years of experience crafting cinematic stories for brands, agencies, and individuals worldwide.
            </p>

            <p className="about-body text-white/40 font-satoshi text-sm leading-relaxed mb-4">
              My work lives at the intersection of technical precision and emotional storytelling. From blockbuster-style commercials to intimate wedding films, I approach every project with the same goal: making the audience feel something they didn't expect.
            </p>

            <p className="about-body text-white/40 font-satoshi text-sm leading-relaxed mb-8">
              In 2023, I expanded into AI filmmaking — using tools like Runway, Kling, and Midjourney to push the boundaries of visual storytelling in ways that weren't possible even 2 years ago.
            </p>

            {/* Stats */}
            <div className="about-body grid grid-cols-2 gap-6">
              {[
                { label: 'Years of Experience', target: 7, suffix: '+' },
                { label: 'Projects Completed', target: 200, suffix: '+' },
                { label: 'Happy Clients', target: 80, suffix: '+' },
                { label: 'Awards Won', target: 12, suffix: '' },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="counter-val font-display text-4xl text-accent leading-none"
                    style={{ fontFamily: '"Bebas Neue", cursive' }}
                    data-target={s.target}
                    data-suffix={s.suffix}
                  >
                    0{s.suffix}
                  </div>
                  <div className="text-white/30 text-xs uppercase tracking-widest mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Image */}
          <div className="relative">
            {/* Main image */}
            <div
              ref={imgRef}
              className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: '4/5' }}
            >
              <img
                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80"
                alt="Alex Ray — Video Editor"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Floating accent card */}
            <div className="absolute -bottom-6 -left-6 glass rounded-xl p-5 border-accent-glow">
              <div className="text-accent text-xs uppercase tracking-widest font-satoshi mb-1">Currently Available</div>
              <div className="text-white font-satoshi font-semibold text-sm">Open for Projects</div>
            </div>

            {/* Decorative element */}
            <div
              className="absolute -top-4 -right-4 w-32 h-32 border border-white/[0.06] rounded-full"
              style={{ background: 'radial-gradient(circle at center, rgba(0,212,255,0.05), transparent)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
