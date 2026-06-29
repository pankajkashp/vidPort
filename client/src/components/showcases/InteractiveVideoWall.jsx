// src/components/showcases/InteractiveVideoWall.jsx
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../../animations/gsap.js';
import { splitText } from '../../animations/splitText.js';

const InteractiveVideoWall = ({ title, description, projects = [] }) => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const wallRef = useRef(null);

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
      gsap.from('.vw-desc', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      // Mouse Parallax on the wall (desktop only)
      if (window.innerWidth > 768 && wallRef.current) {
        const wall = wallRef.current;
        const xTo = gsap.quickTo(wall, "x", { duration: 0.8, ease: "power3" });
        const yTo = gsap.quickTo(wall, "y", { duration: 0.8, ease: "power3" });

        const handleMouseMove = (e) => {
          const { clientX, clientY } = e;
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          
          // Move opposite to mouse direction, max 30px
          const moveX = ((centerX - clientX) / centerX) * 30;
          const moveY = ((centerY - clientY) / centerY) * 30;
          
          xTo(moveX);
          yTo(moveY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  if (!projects.length) return null;

  // Duplicate projects to fill the wall if we don't have enough
  const fillProjects = [...projects, ...projects, ...projects].slice(0, 9);

  return (
    <section ref={sectionRef} className="py-24 md:py-36 bg-bg-primary relative overflow-hidden">
      
      {/* Header (Absolute centered over the wall) */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
        <div className="p-8 md:p-16 bg-black/60 backdrop-blur-xl rounded-3xl border border-white/10 max-w-4xl pointer-events-auto">
          <h2
            ref={headerRef}
            className="font-display text-5xl md:text-7xl lg:text-8xl text-white leading-none overflow-hidden mb-6"
            style={{ fontFamily: '"Bebas Neue", cursive' }}
          >
            {title}
          </h2>
          <p className="vw-desc text-white/60 font-satoshi text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            {description}
          </p>
          <div className="vw-desc">
            <Link to={`/projects/${projects[0]?.id}`} className="btn-primary inline-flex cursor-none">
              Explore Case Study
            </Link>
          </div>
        </div>
      </div>

      {/* Video Wall Background */}
      <div className="relative w-[120vw] h-[120vh] -left-[10vw] -top-[10vh] opacity-40">
        <div ref={wallRef} className="grid grid-cols-3 gap-4 w-full h-full">
          {fillProjects.map((project, i) => (
            <div 
              key={`${project.id}-${i}`}
              className="relative w-full h-full overflow-hidden rounded-xl border border-white/[0.05]"
            >
              <img 
                src={project.thumbnail} 
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Autoplay muted videos for the wall effect */}
              {project.previewVideo && (
                <video 
                  src={project.previewVideo}
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                  muted loop autoPlay playsInline
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveVideoWall;
