// src/components/projects/ProjectCard.jsx
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../animations/gsap.js';

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    gsap.to(cardRef.current, {
      y: -8,
      scale: 1.01,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power3.out',
    });
  };

  return (
    <Link
      to={`/projects/${project.id}`}
      ref={cardRef}
      className="stagger-item block relative rounded-xl overflow-hidden bg-bg-card border border-white/[0.05] group cursor-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="video"
      style={{
        boxShadow: hovered
          ? '0 30px 60px rgba(0,0,0,0.5), 0 0 30px rgba(0,212,255,0.05)'
          : '0 10px 30px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.4s ease',
      }}
    >
      {/* Thumbnail / Video preview */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
        {/* Static thumbnail */}
        <img
          src={project.thumbnail}
          alt={project.title}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            hovered ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
          }`}
          loading="lazy"
        />

        {/* Video preview on hover */}
        <video
          ref={videoRef}
          src={project.previewVideo}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
          muted
          loop
          playsInline
          preload="none"
        />

        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-60'}`} />

        {/* Play indicator */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-sm bg-white/5">
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3 badge z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.category}
        </div>

        {/* Year */}
        <div className="absolute top-3 right-3 text-white/40 text-xs font-satoshi font-medium">
          {project.year}
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-satoshi font-semibold text-white text-base leading-snug group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          <span className="text-white/30 text-xs font-satoshi shrink-0 mt-0.5">{project.duration}</span>
        </div>

        <p className="text-white/40 text-xs font-satoshi leading-relaxed line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Software tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.software.slice(0, 3).map((sw) => (
            <span key={sw} className="text-[0.65rem] px-2 py-0.5 rounded bg-white/[0.04] text-white/30 font-satoshi">
              {sw}
            </span>
          ))}
        </div>
      </div>

      {/* Accent bottom line on hover */}
      <div className={`absolute bottom-0 left-0 h-px bg-accent transition-all duration-500 ${hovered ? 'w-full' : 'w-0'}`} />
    </Link>
  );
};

export default ProjectCard;
