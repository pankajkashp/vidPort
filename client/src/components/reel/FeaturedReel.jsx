// src/components/reel/FeaturedReel.jsx
import { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '../../animations/gsap.js';

const FeaturedReel = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Container reveal
      gsap.from('.reel-container', {
        scale: 0.88,
        opacity: 0,
        duration: 1.4,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });

      // Label + heading
      gsap.from('.reel-text', {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePlay = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <section ref={sectionRef} id="reel" className="py-24 md:py-36 bg-bg-primary">
        <div className="section-container">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <p className="reel-text section-label">Featured Work</p>
              <h2
                className="reel-text font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none"
                style={{ fontFamily: '"Bebas Neue", cursive' }}
              >
                SHOWREEL
                <span className="text-stroke ml-4">2024</span>
              </h2>
            </div>
            <p className="reel-text text-white/40 max-w-xs text-sm font-satoshi leading-relaxed">
              A curated selection of my best commercial, cinematic, and AI-generated work.
            </p>
          </div>

          {/* Video Container */}
          <div
            className="reel-container relative rounded-2xl overflow-hidden border border-white/[0.06] cursor-none group"
            style={{ aspectRatio: '16/7' }}
            data-cursor="video"
            onClick={handlePlay}
          >
            {/* Poster */}
            <img
              src="https://images.unsplash.com/photo-1536240478700-b869ad10a2eb?w=1400&q=80"
              alt="Showreel thumbnail"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="relative flex items-center justify-center">
                {/* Pulsing rings */}
                <div className="absolute w-28 h-28 rounded-full border border-white/20 animate-ping" style={{ animationDuration: '2s' }} />
                <div className="absolute w-20 h-20 rounded-full border border-white/30 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />

                {/* Play circle */}
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent/60 transition-all duration-300">
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Duration badge */}
            <div className="absolute bottom-4 right-4 glass px-3 py-1.5 rounded-full z-10">
              <span className="text-white/70 text-xs font-satoshi font-medium">2:47 min</span>
            </div>

            {/* Category tag */}
            <div className="absolute top-4 left-4 badge z-10">2024 Showreel</div>
          </div>

          {/* Stats below reel */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-px bg-white/[0.04]">
            {[
              { label: 'Minutes of Footage', value: '120+' },
              { label: 'Projects Featured', value: '24' },
              { label: 'Clients Represented', value: '18' },
              { label: 'Awards Won', value: '12' },
            ].map((stat) => (
              <div key={stat.label} className="bg-bg-primary px-6 py-6 text-center">
                <div className="font-display text-4xl text-accent mb-1" style={{ fontFamily: '"Bebas Neue", cursive' }}>
                  {stat.value}
                </div>
                <div className="text-white/30 text-xs uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleClose}
              className="absolute -top-12 right-0 text-white/60 hover:text-white text-sm flex items-center gap-2 cursor-none"
            >
              Close
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <video
                className="w-full h-full object-cover"
                autoPlay
                controls
                src="https://www.w3schools.com/html/mov_bbb.mp4"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedReel;
