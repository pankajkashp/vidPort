// src/components/services/Workflow.jsx
import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '../../animations/gsap.js';
import { WORKFLOW_STEPS } from '../../utils/constants.js';

const WorkflowStep = ({ step, index }) => (
  <div
    className="workflow-step flex-shrink-0 w-80 md:w-96 flex flex-col p-8 rounded-2xl border border-white/[0.06] bg-bg-card"
    style={{
      background: `linear-gradient(135deg, rgba(24,24,24,0.8), rgba(5,5,5,0.6))`,
    }}
  >
    {/* Step number */}
    <div className="flex items-center justify-between mb-6">
      <span
        className="font-display text-6xl leading-none"
        style={{
          fontFamily: '"Bebas Neue", cursive',
          color: 'rgba(255,255,255,0.08)',
        }}
      >
        {step.step}
      </span>
      <span className="text-2xl">{step.icon}</span>
    </div>

    {/* Title */}
    <h3 className="font-satoshi font-semibold text-white text-xl mb-3 leading-snug">
      {step.title}
    </h3>

    {/* Description */}
    <p className="text-white/40 font-satoshi text-sm leading-relaxed flex-1">
      {step.description}
    </p>

    {/* Accent line */}
    <div
      className="mt-6 h-px w-12"
      style={{ background: step.color }}
    />
  </div>
);

const Workflow = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from('.wf-heading', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });

      // Horizontal scroll pin — desktop only
      if (window.innerWidth > 768) {
        const totalWidth = trackRef.current?.scrollWidth || 0;
        const viewWidth = window.innerWidth;

        gsap.to(trackRef.current, {
          x: -(totalWidth - viewWidth + 64),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${totalWidth}`,
            pin: true,
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="workflow" className="py-24 md:py-0 bg-bg-primary overflow-hidden">
      <div className="md:h-screen flex flex-col justify-center">
        {/* Section Header */}
        <div className="section-container mb-12 pt-24 md:pt-0">
          <p className="wf-heading section-label">Process</p>
          <h2
            className="wf-heading font-display text-5xl md:text-7xl text-white leading-none"
            style={{ fontFamily: '"Bebas Neue", cursive' }}
          >
            EDITING
            <br />
            <span className="gradient-text-blue">WORKFLOW</span>
          </h2>
        </div>

        {/* Horizontal scroll track */}
        <div
          ref={trackRef}
          className="horizontal-scroll-container px-8 md:px-16 gap-4 pb-24"
        >
          {WORKFLOW_STEPS.map((step, i) => (
            <WorkflowStep key={step.step} step={step} index={i} />
          ))}
          {/* Spacer at end */}
          <div className="w-16 flex-shrink-0" />
        </div>
      </div>
    </section>
  );
};

export default Workflow;
