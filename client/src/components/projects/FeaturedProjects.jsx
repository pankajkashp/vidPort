// src/components/projects/FeaturedProjects.jsx
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../animations/gsap.js';
import { getFeaturedProjects } from '../../utils/helpers.js';
import projects from '../../data/projects.json';

const FeaturedProjects = () => {
  const sectionRef = useRef(null);
  const featured = getFeaturedProjects(projects);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fp-heading', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      gsap.from('.fp-card', {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.fp-grid', start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-24 md:py-36 bg-bg-primary">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <p className="fp-heading section-label">Portfolio</p>
            <h2
              className="fp-heading font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none"
              style={{ fontFamily: '"Bebas Neue", cursive' }}
            >
              FEATURED
              <br />
              <span className="gradient-text-blue">PROJECTS</span>
            </h2>
          </div>
          <div className="fp-heading flex flex-col gap-3">
            <p className="text-white/40 max-w-xs text-sm font-satoshi leading-relaxed">
              Hand-picked projects spanning commercials, AI films, travel documentaries, and more.
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-accent text-sm font-satoshi font-medium hover:gap-4 transition-all duration-300"
            >
              View All Projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Featured Grid — large asymmetric layout */}
        <div className="fp-grid grid grid-cols-1 md:grid-cols-12 gap-4">
          {featured.slice(0, 4).map((project, i) => {
            // Large card for first project
            const isHero = i === 0;
            const colSpan = isHero
              ? 'md:col-span-8'
              : i === 1
              ? 'md:col-span-4'
              : 'md:col-span-4';

            return (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className={`fp-card relative rounded-xl overflow-hidden group cursor-none block ${colSpan}`}
                style={{ aspectRatio: isHero ? '16/9' : '4/5' }}
                data-cursor="video"
              >
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                  <div className="badge mb-3 self-start">{project.category}</div>
                  <h3
                    className="font-display text-3xl md:text-4xl text-white leading-tight group-hover:text-accent transition-colors duration-300"
                    style={{ fontFamily: '"Bebas Neue", cursive' }}
                  >
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-white/40 text-xs font-satoshi">{project.client}</span>
                    <span className="text-white/20 text-xs">·</span>
                    <span className="text-white/40 text-xs font-satoshi">{project.year}</span>
                  </div>
                </div>

                {/* Hover border */}
                <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-accent/30 transition-colors duration-300 pointer-events-none" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
