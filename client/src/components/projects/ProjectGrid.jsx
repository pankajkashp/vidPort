// src/components/projects/ProjectGrid.jsx
import { useState, useEffect, useRef } from 'react';
import { gsap } from '../../animations/gsap.js';
import ProjectCard from './ProjectCard.jsx';
import CategoryFilter from './CategoryFilter.jsx';
import { filterByCategory } from '../../utils/helpers.js';
import projects from '../../data/projects.json';

const ProjectGrid = ({ limit }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filtered, setFiltered] = useState(projects);
  const gridRef = useRef(null);

  useEffect(() => {
    const result = filterByCategory(projects, activeCategory);
    setFiltered(limit ? result.slice(0, limit) : result);

    // Re-animate grid items on category change
    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll('.stagger-item');
      gsap.from(items, {
        y: 30,
        opacity: 0,
        stagger: 0.07,
        duration: 0.5,
        ease: 'power3.out',
      });
    }
  }, [activeCategory, limit]);

  // Initial scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll('.stagger-item') || [];
      gsap.from(items, {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* Category filter */}
      <div className="mb-10">
        <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />
      </div>

      {/* Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5"
      >
        {filtered.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-24 text-white/30 font-satoshi">
          No projects in this category yet.
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;
