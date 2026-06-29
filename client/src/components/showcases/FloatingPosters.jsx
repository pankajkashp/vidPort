// src/components/showcases/FloatingPosters.jsx
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../animations/gsap.js';
import { splitText } from '../../animations/splitText.js';

const FloatingPosters = ({ title, description, projects = [] }) => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

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

      gsap.from('.fp-desc', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      // Parallax effect on desktop
      if (window.innerWidth > 768) {
        const items = gsap.utils.toArray('.fp-item');
        items.forEach((item, i) => {
          const speed = item.dataset.speed || 1;
          gsap.to(item, {
            y: () => -100 * speed,
            ease: 'none',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  if (!projects.length) return null;

  return (
    <section ref={sectionRef} className="py-24 md:py-36 bg-bg-primary relative overflow-hidden">
      <div className="section-container">
        
        {/* Header */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2
              ref={headerRef}
              className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none overflow-hidden mb-6"
              style={{ fontFamily: '"Bebas Neue", cursive' }}
            >
              {title}
            </h2>
            <p className="fp-desc text-white/40 font-satoshi text-base leading-relaxed">
              {description}
            </p>
          </div>
          <Link to="/projects" className="fp-desc btn-outline flex-shrink-0 cursor-none">
            View All Series
          </Link>
        </div>

        {/* Asymmetric Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          {projects.map((project, i) => {
            // Calculate column spans and offsets to create an asymmetric, floating look
            let colSpan = "md:col-span-12";
            let mt = "mt-0";
            let speed = "1";

            if (i % 3 === 0) {
              colSpan = "md:col-span-7";
              speed = "0.8";
            } else if (i % 3 === 1) {
              colSpan = "md:col-span-5";
              mt = "md:mt-32";
              speed = "1.5";
            } else {
              colSpan = "md:col-span-8 md:col-start-3";
              mt = "md:mt-16";
              speed = "1.2";
            }

            return (
              <div 
                key={project.id} 
                className={`fp-item ${colSpan} ${mt} w-full`}
                data-speed={speed}
              >
                <Link 
                  to={`/projects/${project.id}`}
                  className="group block cursor-none"
                  data-cursor="view"
                >
                  <div 
                    className="relative rounded-xl overflow-hidden mb-6 bg-bg-secondary border border-white/[0.04]"
                    style={{ aspectRatio: i % 3 === 1 ? '4/5' : '16/9' }}
                  >
                    <img 
                      src={project.thumbnail} 
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      loading="lazy"
                    />
                    <video 
                      src={project.previewVideo}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      muted loop playsInline
                      onMouseOver={e => e.target.play().catch(() => {})}
                      onMouseOut={e => { e.target.pause(); e.target.currentTime = 0; }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-3xl md:text-4xl text-white mb-2 group-hover:text-accent transition-colors duration-300" style={{ fontFamily: '"Bebas Neue", cursive' }}>
                        {project.title}
                      </h3>
                      <p className="text-white/40 font-satoshi text-sm line-clamp-2 max-w-md">
                        {project.creativeGoal || project.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <div className="text-white/20 text-xs uppercase tracking-widest font-satoshi mb-1">
                        {project.year}
                      </div>
                      <div className="text-accent text-sm font-satoshi font-medium">
                        {project.duration}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FloatingPosters;
