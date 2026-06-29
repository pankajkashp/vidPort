// src/pages/ProjectDetails.jsx
import { useParams, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { gsap } from '../animations/gsap.js';
import { splitText } from '../animations/splitText.js';
import projects from '../data/projects.json';
import { getRelatedProjects } from '../utils/helpers.js';
import ProjectCard from '../components/projects/ProjectCard.jsx';

const DetailSection = ({ title, content, delay = 0 }) => {
  const elRef = useRef(null);

  useEffect(() => {
    if (!content) return;
    const ctx = gsap.context(() => {
      gsap.from(elRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay,
        scrollTrigger: {
          trigger: elRef.current,
          start: 'top 85%',
        }
      });
    });
    return () => ctx.revert();
  }, [content, delay]);

  if (!content) return null;

  return (
    <div ref={elRef} className="py-10 border-t border-white/[0.06]">
      <h3 className="font-satoshi font-semibold text-white/40 text-xs uppercase tracking-widest mb-4">
        {title}
      </h3>
      <p className="font-satoshi text-white/80 text-lg md:text-xl leading-relaxed max-w-4xl">
        {content}
      </p>
    </div>
  );
};

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const related = project ? getRelatedProjects(projects, id, project.category, 3) : [];
  
  const headerRef = useRef(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to('.pd-bg', {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Header reveals
      gsap.from('.pd-reveal', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.4,
      });

      if (headerRef.current) {
        const titleEl = headerRef.current.querySelector('h1');
        if (titleEl) {
          const { words } = splitText(titleEl, { type: 'words' });
          if (words.length > 0) {
            gsap.from(words, {
              y: '110%',
              duration: 1.1,
              ease: 'power4.out',
              stagger: 0.05,
              delay: 0.2
            });
          }
        }
      }
    }, headerRef);

    return () => ctx.revert();
  }, [id]);

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="text-center">
          <h1 className="font-display text-6xl text-white mb-4" style={{ fontFamily: '"Bebas Neue", cursive' }}>
            PROJECT NOT FOUND
          </h1>
          <Link to="/projects" className="btn-outline cursor-none">Back to Projects</Link>
        </div>
      </main>
    );
  }

  const cs = project.caseStudy || {};

  return (
    <main className="bg-bg-primary min-h-screen">
      
      {/* Cinematic Hero */}
      <div
        ref={headerRef}
        className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      >
        <div className="absolute inset-0 pd-bg">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Back link */}
        <div className="absolute top-32 left-6 md:left-12 z-20">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/40 hover:text-white text-sm font-satoshi transition-colors cursor-none badge bg-black/50 backdrop-blur-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to Showcase
          </Link>
        </div>

        {/* Title Area */}
        <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-20">
          <div className="pd-reveal badge mb-6 self-start inline-flex border-accent/20 text-accent bg-accent/5">
            {project.category}
          </div>
          
          <div className="overflow-hidden mb-6">
            <h1
              className="font-display text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] text-white leading-[0.85]"
              style={{ fontFamily: '"Bebas Neue", cursive' }}
            >
              {project.title}
            </h1>
          </div>

          <p className="pd-reveal text-white/60 font-satoshi text-lg md:text-2xl max-w-3xl leading-relaxed mb-10">
            {project.creativeGoal || project.description}
          </p>

          <div className="pd-reveal flex flex-wrap items-center gap-x-8 gap-y-4 text-white/40 text-sm font-satoshi uppercase tracking-widest border-t border-white/[0.06] pt-8">
            {project.client && <div><span className="block text-white/20 text-xs mb-1">Client</span><span className="text-white">{project.client}</span></div>}
            {project.role && <div><span className="block text-white/20 text-xs mb-1">Role</span><span className="text-white">{project.role}</span></div>}
            <div><span className="block text-white/20 text-xs mb-1">Duration</span><span className="text-white">{project.duration}</span></div>
            <div><span className="block text-white/20 text-xs mb-1">Year</span><span className="text-white">{project.year}</span></div>
          </div>
        </div>
      </div>

      {/* Play Video Banner */}
      <div 
        className="w-full bg-accent hover:bg-white text-black transition-colors duration-500 cursor-none group py-8"
        data-cursor="video"
        onClick={() => setShowVideoModal(true)}
      >
        <div className="flex items-center justify-center gap-4">
          <span className="font-display text-4xl uppercase tracking-widest mt-1" style={{ fontFamily: '"Bebas Neue", cursive' }}>
            Play Final Video
          </span>
          <svg className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Case Study Content */}
      <div className="section-container py-24">
        
        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          {project.aiTools && project.aiTools.length > 0 && (
            <div className="glass p-8 rounded-2xl border-white/[0.04]">
              <h3 className="font-satoshi font-semibold text-white/40 text-xs uppercase tracking-widest mb-6">AI Models & Tools</h3>
              <div className="flex flex-wrap gap-3">
                {project.aiTools.map(t => <span key={t} className="badge bg-white/[0.03] text-white/80">{t}</span>)}
              </div>
            </div>
          )}
          {project.software && project.software.length > 0 && (
            <div className="glass p-8 rounded-2xl border-white/[0.04]">
              <h3 className="font-satoshi font-semibold text-white/40 text-xs uppercase tracking-widest mb-6">Traditional Software</h3>
              <div className="flex flex-wrap gap-3">
                {project.software.map(s => <span key={s} className="badge bg-white/[0.03] text-white/80">{s}</span>)}
              </div>
            </div>
          )}
        </div>

        {/* Editorial Sections */}
        <div className="max-w-4xl mx-auto space-y-4">
          <DetailSection title="The Problem" content={cs.problem} />
          <DetailSection title="The Concept" content={cs.concept} />
          
          {cs.promptEngineering && (
            <div className="py-10 border-t border-white/[0.06]">
              <h3 className="font-satoshi font-semibold text-accent text-xs uppercase tracking-widest mb-4">Prompt Engineering</h3>
              <div className="p-6 md:p-8 rounded-2xl bg-accent/[0.02] border border-accent/10">
                <code className="font-mono text-accent/80 text-sm md:text-base leading-relaxed break-words">
                  "{cs.promptEngineering}"
                </code>
              </div>
            </div>
          )}

          <DetailSection title="Image Generation" content={cs.imageGeneration} />
          <DetailSection title="Video Generation" content={cs.videoGeneration} />
          <DetailSection title="Editing Workflow" content={cs.editing} />
          <DetailSection title="Motion Graphics & VFX" content={cs.motionGraphics} />
          <DetailSection title="Sound Design" content={cs.soundDesign} />
          
          {cs.lessonsLearned && (
            <div className="py-10 border-t border-white/[0.06]">
              <h3 className="font-satoshi font-semibold text-success text-xs uppercase tracking-widest mb-4">Lessons Learned</h3>
              <p className="font-satoshi text-white/80 text-lg md:text-xl leading-relaxed border-l-2 border-success/30 pl-6">
                {cs.lessonsLearned}
              </p>
            </div>
          )}
        </div>

        {/* Related Projects */}
        {related.length > 0 && (
          <div className="mt-32 pt-16 border-t border-white/[0.04]">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-display text-4xl text-white" style={{ fontFamily: '"Bebas Neue", cursive' }}>
                MORE LIKE THIS
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
            </div>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-[200] bg-black/98 flex items-center justify-center p-4 backdrop-blur-lg"
          onClick={() => setShowVideoModal(false)}
        >
          <div className="relative w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute -top-16 right-0 text-white/40 hover:text-white text-sm flex items-center gap-2 cursor-none font-satoshi uppercase tracking-widest"
            >
              Close <span className="text-xl">✕</span>
            </button>
            <div className="rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,212,255,0.1)] border border-white/10" style={{ aspectRatio: '16/9' }}>
              <video className="w-full h-full" autoPlay controls src={project.video} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProjectDetails;
