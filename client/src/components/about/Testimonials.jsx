// src/components/about/Testimonials.jsx
import { useRef, useEffect } from 'react';
import { gsap } from '../../animations/gsap.js';
import testimonials from '../../data/testimonials.json';

const StarRating = ({ count = 5 }) => (
  <div className="flex gap-1">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} className="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const TestimonialCard = ({ testimonial }) => (
  <div className="glass rounded-xl p-6 md:p-8 border-cinematic min-w-[320px] md:min-w-[380px] flex-shrink-0 mx-3">
    <StarRating count={testimonial.rating} />
    <p className="text-white/70 font-satoshi text-sm leading-relaxed mt-4 mb-6">
      "{testimonial.text}"
    </p>
    <div className="flex items-center gap-3">
      <img
        src={testimonial.avatar}
        alt={testimonial.name}
        className="w-10 h-10 rounded-full object-cover border border-white/10"
        loading="lazy"
      />
      <div>
        <div className="text-white font-satoshi font-semibold text-sm">{testimonial.name}</div>
        <div className="text-white/30 text-xs font-satoshi">
          {testimonial.role} · {testimonial.company}
        </div>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const sectionRef = useRef(null);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.test-heading', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Double the array for seamless loop
  const doubled = [...testimonials, ...testimonials];
  const half = Math.ceil(doubled.length / 2);
  const row1 = doubled.slice(0, half);
  const row2 = doubled.slice(half);

  return (
    <section ref={sectionRef} id="testimonials" className="py-24 md:py-36 bg-bg-secondary overflow-hidden">
      <div className="section-container mb-12">
        <p className="test-heading section-label">Client Love</p>
        <h2
          className="test-heading font-display text-5xl md:text-7xl text-white leading-none"
          style={{ fontFamily: '"Bebas Neue", cursive' }}
        >
          WHAT THEY
          <span className="gradient-text-blue ml-4">SAY</span>
        </h2>
      </div>

      {/* Infinite marquee row 1 */}
      <div className="relative w-full overflow-hidden mb-4">
        <div
          ref={track1Ref}
          className="flex"
          style={{ animation: 'marquee 40s linear infinite' }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={`r1-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Infinite marquee row 2 — reversed */}
      <div className="relative w-full overflow-hidden">
        <div
          ref={track2Ref}
          className="flex"
          style={{ animation: 'marquee-reverse 40s linear infinite' }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={`r2-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg-secondary to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg-secondary to-transparent z-10" />
    </section>
  );
};

export default Testimonials;
