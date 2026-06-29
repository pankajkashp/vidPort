// src/components/layout/Cursor/Cursor.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../../animations/gsap.js';

const Cursor = () => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [cursorType, setCursorType] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only on desktop
    if (window.innerWidth <= 768) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    // Initial position off-screen
    gsap.set([outer, inner], { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e) => {
      setIsVisible(true);
      gsap.to(inner, { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'none' });
      gsap.to(outer, { x: e.clientX, y: e.clientY, duration: 0.45, ease: 'power3.out' });
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Hoverable listeners
    const addHoverListeners = () => {
      const links = document.querySelectorAll('a, button, [data-cursor]');
      const videos = document.querySelectorAll('[data-cursor="video"]');

      links.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          const type = el.dataset.cursor || 'link';
          setCursorType(type);
          gsap.to(outer, { scale: 2.5, duration: 0.3, ease: 'power3.out' });
          gsap.to(inner, { scale: 0.4, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
          setCursorType('default');
          gsap.to(outer, { scale: 1, duration: 0.3, ease: 'power3.out' });
          gsap.to(inner, { scale: 1, duration: 0.3 });
        });
      });

      videos.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setCursorType('video');
          gsap.to(outer, { scale: 4, duration: 0.4, ease: 'power3.out' });
          gsap.to(inner, { scale: 0.2, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
          setCursorType('default');
          gsap.to(outer, { scale: 1, duration: 0.3, ease: 'power3.out' });
          gsap.to(inner, { scale: 1, duration: 0.3 });
        });
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const timer = setTimeout(addHoverListeners, 600);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: cursorType === 'video'
            ? '1px solid rgba(0,212,255,0.8)'
            : '1px solid rgba(255,255,255,0.5)',
          opacity: isVisible ? 1 : 0,
          transition: 'border-color 0.3s, opacity 0.3s',
          mixBlendMode: 'difference',
        }}
      >
        {cursorType === 'video' && (
          <span
            className="absolute inset-0 flex items-center justify-center text-accent text-[0.6rem] font-semibold tracking-widest uppercase"
            style={{ fontSize: '7px' }}
          >
            Play
          </span>
        )}
      </div>

      {/* Inner Dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: cursorType === 'link' ? 'var(--accent)' : 'white',
          opacity: isVisible ? 1 : 0,
          transition: 'background 0.2s, opacity 0.3s',
        }}
      />
    </>
  );
};

export default Cursor;
