// src/components/about/Skills.jsx
import { useRef, useEffect } from 'react';
import { gsap } from '../../animations/gsap.js';
import { SOFTWARE_SKILLS } from '../../utils/constants.js';

const SkillBar = ({ skill, delay }) => {
  const barRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(barRef.current, {
        width: '0%',
        duration: 1.5,
        ease: 'power3.out',
        delay: delay || 0,
        scrollTrigger: {
          trigger: barRef.current,
          start: 'top 90%',
        },
      });
    });
    return () => ctx.revert();
  }, [delay]);

  return (
    <div className="skill-item">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">{skill.icon}</span>
          <span className="font-satoshi text-sm font-medium text-white/80">{skill.name}</span>
        </div>
        <span className="font-display text-lg text-accent/80" style={{ fontFamily: '"Bebas Neue", cursive' }}>
          {skill.level}%
        </span>
      </div>
      <div className="progress-bar-track">
        <div
          ref={barRef}
          className="progress-bar-fill"
          style={{ width: `${skill.level}%` }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-heading', {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const col1 = SOFTWARE_SKILLS.slice(0, 5);
  const col2 = SOFTWARE_SKILLS.slice(5, 10);

  return (
    <section ref={sectionRef} id="skills" className="py-24 md:py-36 bg-bg-primary">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <p className="skills-heading section-label">Expertise</p>
            <h2
              className="skills-heading font-display text-5xl md:text-7xl text-white leading-none"
              style={{ fontFamily: '"Bebas Neue", cursive' }}
            >
              SOFTWARE
              <br />
              <span className="gradient-text-blue">MASTERY</span>
            </h2>
          </div>
          <p className="skills-heading text-white/40 max-w-xs text-sm font-satoshi leading-relaxed">
            Industry-standard tools and cutting-edge AI platforms — all in one workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
          {col1.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} delay={i * 0.08} />
          ))}
          {col2.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} delay={i * 0.08 + 0.2} />
          ))}
        </div>

        {/* Software logo cloud */}
        <div className="mt-16 pt-12 border-t border-white/[0.05]">
          <p className="text-center text-white/20 text-xs uppercase tracking-widest font-satoshi mb-8">
            Trusted Tools
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {SOFTWARE_SKILLS.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/30 hover:text-white/60 hover:border-white/10 transition-all duration-300 cursor-none"
              >
                <span className="text-sm">{skill.icon}</span>
                <span className="text-xs font-satoshi">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
