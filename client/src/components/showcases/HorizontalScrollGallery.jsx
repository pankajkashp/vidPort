// src/components/showcases/HorizontalScrollGallery.jsx
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../animations/gsap.js';
import { splitText } from '../../animations/splitText.js';

const HorizontalScrollGallery = ({ title, description, projects = [], category }) => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      if (headerRef.current) {
        const { words } = splitText(headerRef.current, { type: 'words' });
        if (words.length > 0) {
          gsap.from(words, {
            y: '100%',
            opacity: 0,
            duration: 1,
            ease: 'power4.out',
            stagger: 0.05,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          });
        }
      }

      gsap.from('.hs-desc', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      // Horizontal scroll pin — desktop only
      if (window.innerWidth > 768 && trackRef.current) {
        const track = trackRef.current;
        const totalWidth = track.scrollWidth;
        const viewWidth = window.innerWidth;
        const distanceToScroll = totalWidth - viewWidth + 120; // 120px padding buffer

        gsap.to(track, {
          x: -distanceToScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${distanceToScroll}`,
            pin: true,
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  if (!projects.length) return null;

  return (
    <section ref={sectionRef} className="py-24 md:py-0 bg-bg-primary overflow-hidden relative">
      <div className="md:h-screen flex flex-col justify-center">
        
        {/* Header */}
        <div className="section-container pt-12 md:pt-24 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 z-10 relative">
          <div>
            <div className="hs-desc badge mb-4 inline-flex">{category}</div>
            <h2
              ref={headerRef}
              className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none overflow-hidden"
              style={{ fontFamily: '"Bebas Neue", cursive' }}
            >
              {title}
            </h2>
          </div>
          <p className="hs-desc text-white/40 font-satoshi text-sm max-w-sm leading-relaxed pb-2">
            {description}
          </p>
        </div>

        {/* Track */}
        <div 
          ref={trackRef}
          className="flex flex-col md:flex-row gap-8 px-6 md:px-12 lg:px-20 pb-12 w-max"
        >
          {projects.map((project, i) => (
            <Link 
              to={`/projects/${project.id}`}
              key={project.id}
              className="group block relative w-full md:w-[60vw] lg:w-[45vw] flex-shrink-0 cursor-none"
              data-cursor="view"
            >
              {/* Media Container */}
              <div 
                className="relative rounded-xl overflow-hidden mb-6 bg-bg-secondary"
                style={{ aspectRatio: '16/9' }}
              >
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <video 
                  src={project.previewVideo}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  muted loop playsInline
                  onMouseOver={e => e.target.play().catch(() => {})}
                  onMouseOut={e => { e.target.pause(); e.target.currentTime = 0; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Meta */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-satoshi font-semibold text-white text-2xl mb-2 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3 text-white/40 text-xs font-satoshi uppercase tracking-widest">
                    <span>{project.client}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{project.year}</span>
                  </div>
                </div>
                
                {project.aiTools && project.aiTools.length > 0 && (
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {project.aiTools.slice(0, 2).map(tool => (
                      <span key={tool} className="px-3 py-1 text-[0.65rem] border border-white/10 rounded-full text-white/60 bg-white/[0.02]">
                        {tool}
                      </span>
                    ))}
                    {project.aiTools.length > 2 && (
                      <span className="px-2 py-1 text-[0.65rem] border border-white/10 rounded-full text-white/40">
                        +{project.aiTools.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          ))}
          <div className="w-12 md:w-32 flex-shrink-0" /> {/* End spacer */}
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollGallery;
