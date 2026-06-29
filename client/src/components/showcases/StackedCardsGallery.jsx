// src/components/showcases/StackedCardsGallery.jsx
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../animations/gsap.js';
import { splitText } from '../../animations/splitText.js';

const StackedCard = ({ project, index, total }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Each card scales down slightly and fades slightly when the NEXT card overlaps it
      gsap.to(cardRef.current, {
        scale: 1 - ((total - index) * 0.03),
        opacity: 0.4 + (index / total) * 0.6,
        ease: 'none',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top top+=100', // When this card reaches 100px from top
          end: 'bottom top+=100', // Until it scrolls out
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, [index, total]);

  return (
    <div 
      ref={cardRef}
      className="sticky top-24 pt-8 w-full max-w-4xl mx-auto origin-top"
      style={{ zIndex: index + 10 }}
    >
      <Link 
        to={`/projects/${project.id}`}
        className="block group relative rounded-2xl overflow-hidden bg-bg-card border border-white/[0.08] shadow-2xl cursor-none"
        data-cursor="view"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Media Half (Vertical format optimized) */}
          <div className="relative bg-black" style={{ aspectRatio: '4/5' }}>
            <img 
              src={project.thumbnail} 
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            <video 
              src={project.previewVideo}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              muted loop playsInline
              onMouseOver={e => e.target.play().catch(() => {})}
              onMouseOut={e => { e.target.pause(); e.target.currentTime = 0; }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg-card to-transparent md:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-card to-transparent md:hidden block" />
          </div>

          {/* Text Half */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="badge mb-6 self-start text-xs border-accent/20 text-accent bg-accent/5">
              {project.category}
            </div>
            
            <h3 className="font-satoshi font-semibold text-white text-3xl md:text-4xl mb-4 leading-tight group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
            
            <p className="text-white/40 font-satoshi text-sm leading-relaxed mb-8 line-clamp-3">
              {project.creativeGoal || project.description}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-white/20 text-xs uppercase tracking-widest font-satoshi w-20">Tools</span>
                <div className="flex flex-wrap gap-2 flex-1">
                  {project.aiTools && project.aiTools.length > 0 
                    ? project.aiTools.map(t => <span key={t} className="text-white/60 text-xs font-satoshi">{t}</span>)
                    : project.software?.map(s => <span key={s} className="text-white/60 text-xs font-satoshi">{s}</span>)
                  }
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white/20 text-xs uppercase tracking-widest font-satoshi w-20">Client</span>
                <span className="text-white/80 text-sm font-satoshi">{project.client}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const StackedCardsGallery = ({ title, description, projects = [] }) => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
      gsap.from('.sc-desc', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [projects]);

  if (!projects.length) return null;

  return (
    <section ref={sectionRef} className="py-24 md:py-36 bg-bg-secondary relative">
      <div className="section-container">
        {/* Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <h2
            ref={headerRef}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none overflow-hidden mb-6"
            style={{ fontFamily: '"Bebas Neue", cursive' }}
          >
            {title}
          </h2>
          <p className="sc-desc text-white/40 font-satoshi text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Stacked Cards Container */}
        <div className="relative pb-32">
          {projects.map((project, i) => (
            <StackedCard 
              key={project.id} 
              project={project} 
              index={i} 
              total={projects.length} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackedCardsGallery;
