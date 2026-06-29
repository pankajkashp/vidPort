// src/components/layout/Loader/Loader.jsx
import { useEffect, useRef } from 'react';
import { gsap } from '../../../animations/gsap.js';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const countRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    // Safety fallback: always call onComplete after max 4s
    const fallbackTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 4000);

    const tl = gsap.timeline({
      onComplete: () => {
        clearTimeout(fallbackTimer);
        if (onComplete) onComplete();
      },
    });

    const counts = ['05', '04', '03', '02', '01'];

    counts.forEach((num) => {
      tl.call(() => {
        if (countRef.current) countRef.current.textContent = num;
      });
      tl.to({}, { duration: 0.28 }); // pause between counts
    });

    // Loading bar fills simultaneously
    tl.to(
      lineRef.current,
      {
        scaleX: 1,
        duration: 1.4,
        ease: 'power2.inOut',
        transformOrigin: 'left center',
      },
      0
    );

    // Exit
    tl.to(loaderRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
      delay: 0.2,
    });

    return () => {
      clearTimeout(fallbackTimer);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg-primary overflow-hidden"
    >
      {/* Film perforations top */}
      <div className="absolute top-0 left-0 right-0 flex justify-around py-2">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="w-6 h-4 rounded-sm border border-white/10 bg-black" />
        ))}
      </div>

      {/* Center content */}
      <div className="flex flex-col items-center gap-6">
        <div className="text-[0.65rem] tracking-[0.4em] text-white/30 uppercase font-sans">
          Alex Ray Films
        </div>

        <div
          ref={countRef}
          className="text-[12rem] leading-none text-white/90 select-none font-bold tabular-nums"
          style={{ fontFamily: '"Bebas Neue", cursive, Arial' }}
        >
          05
        </div>

        {/* Loading bar */}
        <div className="w-48 h-px bg-white/10 overflow-hidden">
          <div
            ref={lineRef}
            className="h-full"
            style={{
              background: 'var(--accent, #00D4FF)',
              transform: 'scaleX(0)',
              transformOrigin: 'left center',
            }}
          />
        </div>

        <div className="text-[0.65rem] tracking-[0.3em] text-white/25 uppercase font-sans">
          Loading Experience
        </div>
      </div>

      {/* Film perforations bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-around py-2">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="w-6 h-4 rounded-sm border border-white/10 bg-black" />
        ))}
      </div>
    </div>
  );
};

export default Loader;
