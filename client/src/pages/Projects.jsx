// src/pages/Projects.jsx
import { useEffect, useRef } from 'react';
import { gsap } from '../animations/gsap.js';
import ProjectGrid from '../components/projects/ProjectGrid.jsx';

const Projects = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proj-head', {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="pt-32 pb-24 bg-bg-primary min-h-screen">
      <div className="section-container">
        <header ref={headerRef} className="mb-16">
          <p className="proj-head section-label">Portfolio</p>
          <h1
            className="proj-head font-display text-6xl md:text-8xl lg:text-[8rem] text-white leading-none mb-6"
            style={{ fontFamily: '"Bebas Neue", cursive' }}
          >
            ALL
            <span className="gradient-text-blue ml-4">PROJECTS</span>
          </h1>
          <p className="proj-head text-white/40 font-satoshi text-base max-w-lg leading-relaxed">
            Every project is a story — browse the full portfolio by category, from cinematic commercials to AI-generated films.
          </p>
        </header>

        <ProjectGrid />
      </div>
    </main>
  );
};

export default Projects;
