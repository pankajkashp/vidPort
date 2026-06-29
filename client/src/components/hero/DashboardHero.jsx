import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../animations/gsap.js';

const DashboardHero = ({ projects }) => {
  const featuredProjects = projects.filter(p => p.featured).slice(0, 6);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = featuredProjects[activeIndex];
  const videoRef = useRef(null);
  const prevVideoRef = useRef(null);
  const [prevProject, setPrevProject] = useState(null);

  // Handle Video Crossfade Transition
  useEffect(() => {
    if (!activeProject || !videoRef.current) return;
    
    // Crossfade effect
    const ctx = gsap.context(() => {
      // Fade out previous video if it exists
      if (prevVideoRef.current && prevProject && prevProject.id !== activeProject.id) {
        gsap.to(prevVideoRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
             setPrevProject(activeProject);
          }
        });
      } else if (!prevProject) {
        setPrevProject(activeProject);
      }
      
      // Fade in new video
      gsap.fromTo(videoRef.current, 
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }
      );
    });

    return () => ctx.revert();
  }, [activeProject, prevProject]);

  // Handle Right Panel text reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.meta-reveal', 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power2.out', clearProps: 'all' }
      );
    });
    return () => ctx.revert();
  }, [activeIndex]);

  if (!featuredProjects.length) return null;

  return (
    <section className="h-[calc(100vh-80px)] mt-[80px] w-full bg-black overflow-hidden flex flex-col md:flex-row text-white">
      
      {/* 
        LEFT PANEL: Navigation & Selection 
        Width: ~25% on Desktop
      */}
      <div className="w-full md:w-[25%] lg:w-[22%] h-[30vh] md:h-full bg-bg-primary border-r border-white/10 flex flex-col z-20">

        {/* Scrollable Project List */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-row md:flex-col gap-3">
          <div className="hidden md:block text-xs font-satoshi text-white/40 uppercase tracking-widest px-2 mb-2">
            Featured Projects
          </div>
          {featuredProjects.map((project, idx) => (
            <div 
              key={project.id}
              onClick={() => setActiveIndex(idx)}
              className={`group flex items-center gap-4 p-2 md:p-3 rounded-lg cursor-none transition-all duration-300 w-64 md:w-auto flex-shrink-0
                ${activeIndex === idx ? 'bg-white/10 shadow-lg' : 'hover:bg-white/[0.04]'}`}
              data-cursor="pointer"
            >
              <div className="relative w-24 h-16 md:w-20 md:h-14 flex-shrink-0 rounded bg-bg-secondary overflow-hidden">
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-500 ${activeIndex === idx ? 'scale-110' : 'group-hover:scale-110'}`}
                />
                {/* Subtle overlay for inactive items */}
                <div className={`absolute inset-0 bg-black/40 transition-opacity ${activeIndex === idx ? 'opacity-0' : 'group-hover:opacity-0'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-satoshi text-accent mb-1 uppercase tracking-wider">{project.category}</div>
                <div className={`font-satoshi text-sm truncate transition-colors ${activeIndex === idx ? 'text-white font-semibold' : 'text-white/60 group-hover:text-white'}`}>
                  {project.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 
        CENTER PANEL: Cinematic Video Player 
        Width: ~55% on Desktop
      */}
      <div className="w-full md:w-[50%] lg:w-[56%] h-[50vh] md:h-full relative bg-black flex flex-col z-10 border-r border-white/10">
        
        {/* Prev Video (for crossfade) */}
        {prevProject && (
          <video 
            ref={prevVideoRef}
            src={prevProject.video || prevProject.previewVideo}
            className="absolute inset-0 w-full h-full object-cover opacity-100"
            muted loop autoPlay playsInline
          />
        )}
        
        {/* Active Video */}
        <video 
          key={activeProject.id} // Force remount for instant loading if needed, though GSAP handles opacity
          ref={videoRef}
          src={activeProject.video || activeProject.previewVideo}
          className="absolute inset-0 w-full h-full object-cover z-10"
          muted loop autoPlay playsInline
        />

        {/* Video Overlay / Controls */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-10 pointer-events-none">
          <div className="pointer-events-auto flex items-end justify-between">
            <div className="max-w-xl">
              <h1 className="font-display text-4xl md:text-6xl text-white mb-2 leading-none" style={{ fontFamily: '"Bebas Neue", cursive' }}>
                {activeProject.title}
              </h1>
              <p className="font-satoshi text-white/60 text-sm md:text-base line-clamp-2 mb-6">
                {activeProject.creativeGoal || activeProject.description}
              </p>
              <div className="flex gap-4">
                <Link to={`/projects/${activeProject.id}`} className="btn-primary cursor-none text-xs md:text-sm py-2 px-6">
                  View Case Study
                </Link>
                <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-none" data-cursor="pointer">
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
            </div>
            
            {/* Custom Progress Bar / Duration (Visual Only) */}
            <div className="hidden lg:flex items-center gap-3 text-xs font-mono text-white/40">
              <span>0:00</span>
              <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-accent w-1/3" />
              </div>
              <span>{activeProject.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 
        RIGHT PANEL: Dynamic Metadata & Info 
        Width: ~20% on Desktop
      */}
      <div className="w-full md:w-[25%] lg:w-[22%] h-[20vh] md:h-full bg-bg-primary flex flex-col z-20 overflow-y-auto no-scrollbar">
        
        {/* Dynamic Project Meta */}
        <div className="flex-1 p-6 md:p-8 flex flex-col gap-8">
          
          <div key={`meta-${activeProject.id}`} className="space-y-8">
            <div className="meta-reveal">
              <div className="text-xs font-satoshi text-white/40 uppercase tracking-widest mb-2">Industry / Client</div>
              <div className="text-sm font-satoshi text-white/90">{activeProject.client || "Various"}</div>
            </div>

            <div className="meta-reveal">
              <div className="text-xs font-satoshi text-white/40 uppercase tracking-widest mb-2">My Role</div>
              <div className="text-sm font-satoshi text-accent font-medium">{activeProject.role || "Video Editor & Director"}</div>
            </div>

            {(activeProject.aiTools?.length > 0 || activeProject.software?.length > 0) && (
              <div className="meta-reveal">
                <div className="text-xs font-satoshi text-white/40 uppercase tracking-widest mb-3">Creative Tools</div>
                <div className="flex flex-wrap gap-2">
                  {activeProject.aiTools?.map(t => (
                    <span key={t} className="px-2 py-1 bg-white/[0.03] border border-white/10 rounded text-[10px] text-white/70 font-satoshi">
                      {t}
                    </span>
                  ))}
                  {activeProject.software?.map(s => (
                    <span key={s} className="px-2 py-1 bg-white/[0.03] border border-white/10 rounded text-[10px] text-white/70 font-satoshi">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="meta-reveal">
              <div className="text-xs font-satoshi text-white/40 uppercase tracking-widest mb-2">Year</div>
              <div className="text-sm font-mono text-white/90">{activeProject.year}</div>
            </div>
          </div>

        </div>

        {/* Fixed Bottom CTA / Status */}
        <div className="p-6 border-t border-white/10 bg-black/20">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-satoshi text-white/60">Available for freelance</span>
          </div>
          <div className="flex flex-col gap-3">
            <Link to="/contact" className="w-full text-center py-3 bg-white text-black font-satoshi text-sm font-semibold rounded hover:bg-gray-200 transition-colors cursor-none" data-cursor="pointer">
              Start a Project
            </Link>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="w-full text-center py-3 border border-white/20 text-white font-satoshi text-sm rounded hover:bg-white/5 transition-colors cursor-none" data-cursor="pointer">
              Download Resume
            </a>
          </div>
        </div>

      </div>

    </section>
  );
};

export default DashboardHero;
