// src/components/showcases/BeforeAfterSlider.jsx
import { useRef, useEffect, useState } from 'react';
import { gsap } from '../../animations/gsap.js';
import { splitText } from '../../animations/splitText.js';

const Slider = ({ project }) => {
  const containerRef = useRef(null);
  const handleRef = useRef(null);
  const afterRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // Draggable logic without requiring Draggable plugin for simplicity and stability
    const container = containerRef.current;
    if (!container) return;

    let isDown = false;

    const updatePosition = (clientX) => {
      const rect = container.getBoundingClientRect();
      let x = clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width)); // Clamp between 0 and width
      const percentage = (x / rect.width) * 100;
      
      if (handleRef.current && afterRef.current) {
        handleRef.current.style.left = `${percentage}%`;
        afterRef.current.style.clipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;
      }
    };

    const handleDown = (e) => {
      isDown = true;
      setIsDragging(true);
      updatePosition(e.touches ? e.touches[0].clientX : e.clientX);
    };

    const handleMove = (e) => {
      if (!isDown) return;
      updatePosition(e.touches ? e.touches[0].clientX : e.clientX);
    };

    const handleUp = () => {
      isDown = false;
      setIsDragging(false);
    };

    container.addEventListener('mousedown', handleDown);
    container.addEventListener('touchstart', handleDown);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);

    return () => {
      container.removeEventListener('mousedown', handleDown);
      container.removeEventListener('touchstart', handleDown);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/10"
      style={{ aspectRatio: '16/9' }}
      data-cursor={isDragging ? 'drag' : 'default'}
    >
      {/* Before Image (Background) */}
      <img 
        src={project.thumbnail} // In a real app, this would be project.beforeImage
        alt="Before"
        className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-75 brightness-75" // Simulating flat/raw footage
      />
      <div className="absolute top-4 left-4 badge bg-black/50 backdrop-blur-md border-white/10">LOG / RAW</div>

      {/* After Image (Clipped) */}
      <div 
        ref={afterRef}
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
      >
        <img 
          src={project.thumbnail} // Simulated graded footage
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 badge bg-black/50 backdrop-blur-md border-white/10">GRADED</div>
      </div>

      {/* Handle */}
      <div 
        ref={handleRef}
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,212,255,0.5)] z-10 flex items-center justify-center -translate-x-1/2"
        style={{ left: '50%' }}
      >
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-accent">
          <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" transform="rotate(90 12 12)" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const BeforeAfterSlider = ({ title, description, projects = [] }) => {
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
      gsap.from('.ba-reveal', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
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
          <p className="ba-reveal text-white/40 font-satoshi text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Sliders */}
        <div className="space-y-24">
          {projects.map((project) => (
            <div key={project.id} className="ba-reveal">
              <Slider project={project} />
              
              {/* Meta */}
              <div className="mt-8 flex flex-col md:flex-row justify-between gap-6 px-4">
                <div>
                  <h3 className="font-satoshi font-semibold text-white text-2xl mb-2">{project.title}</h3>
                  <p className="text-white/40 font-satoshi text-sm max-w-lg">{project.creativeGoal}</p>
                </div>
                <div className="flex gap-2">
                  {project.software?.map(s => (
                    <span key={s} className="badge self-start">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
