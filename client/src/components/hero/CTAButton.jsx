// src/components/hero/CTAButton.jsx
import { useRef, useEffect } from 'react';
import { gsap } from '../../animations/gsap.js';
import { getMagneticStrength } from '../../animations/gsap.js';

const CTAButton = ({ children, variant = 'primary', href, onClick, className = '' }) => {
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || window.innerWidth <= 768) return;

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const { x, y } = getMagneticStrength(e.clientX, e.clientY, rect, 0.4);
      gsap.to(el, { x, y, duration: 0.4, ease: 'power3.out' });
    };

    const onMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const cls = variant === 'primary' ? 'btn-primary' : 'btn-outline';

  const inner = (
    <span className={`${cls} ${className}`} onClick={onClick}>
      {children}
    </span>
  );

  if (href) {
    return (
      <div ref={wrapRef} className="magnetic-wrap inline-block">
        <a href={href}>{inner}</a>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="magnetic-wrap inline-block" onClick={onClick}>
      {inner}
    </div>
  );
};

export default CTAButton;
