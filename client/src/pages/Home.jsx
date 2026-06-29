import { useEffect, useState } from 'react';
import DashboardHero from '../components/hero/DashboardHero.jsx';

// Showcase Layouts
import HorizontalScrollGallery from '../components/showcases/HorizontalScrollGallery.jsx';
import StackedCardsGallery from '../components/showcases/StackedCardsGallery.jsx';
import FloatingPosters from '../components/showcases/FloatingPosters.jsx';
import BeforeAfterSlider from '../components/showcases/BeforeAfterSlider.jsx';
import InteractiveVideoWall from '../components/showcases/InteractiveVideoWall.jsx';

import projectsData from '../data/projects.json';

const MarqueeText = ({ text }) => {
  const items = Array.from({ length: 8 }, () => text);
  return (
    <div className="py-6 border-y border-white/[0.04] overflow-hidden bg-bg-secondary relative z-10">
      <div className="flex" style={{ animation: 'marquee 20s linear infinite' }}>
        {items.map((item, i) => (
          <span
            key={i}
            className="font-display text-3xl md:text-5xl text-white/[0.06] flex-shrink-0 px-6 uppercase tracking-widest"
            style={{ fontFamily: '"Bebas Neue", cursive' }}
          >
            {item} ✦
          </span>
        ))}
        {items.map((item, i) => (
          <span
            key={`dup-${i}`}
            className="font-display text-3xl md:text-5xl text-white/[0.06] flex-shrink-0 px-6 uppercase tracking-widest"
            style={{ fontFamily: '"Bebas Neue", cursive' }}
          >
            {item} ✦
          </span>
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // In a real app, this would be an API call to the backend
    setProjects(projectsData);
    window.scrollTo(0, 0);
  }, []);

  // Bucket projects into categories for the different showcases
  const commercialProjects = projects.filter(p => 
    p.category.includes('Commercial') || p.category.includes('Brand') || p.category.includes('Storytelling')
  );
  const shortFormProjects = projects.filter(p => 
    p.category.includes('Short-Form') || p.category.includes('Social')
  );
  const cinematicProjects = projects.filter(p => 
    p.category.includes('Long-Form') || p.category.includes('Cinematic')
  );
  const colorProjects = projects.filter(p => 
    p.category.includes('Color')
  );
  const experimentalProjects = projects.filter(p => 
    p.category.includes('Experimental') || p.category.includes('Visual Effects')
  );

  return (
    <main className="bg-bg-primary">
      
      {/* Chapter 1: The 3-Panel Cinematic Dashboard */}
      <DashboardHero projects={projects} />
      
      <MarqueeText text="AI Filmmaker · Director · Motion Designer · Video Editor" />

      {/* Chapter 4: AI Commercials & Brand Campaigns (Horizontal Scroll) */}
      <HorizontalScrollGallery 
        title="AI COMMERCIALS"
        description="High-end, photorealistic AI-generated advertising and brand campaigns crafted with precise prompt engineering and motion control."
        category="Commercial & Storytelling"
        projects={commercialProjects}
      />

      {/* Chapter 5: Social Media & Short-Form (Stacked Cards) */}
      <StackedCardsGallery 
        title="SHORT FORM & VIRAL"
        description="Fast-paced, beat-synced, and visually arresting content optimized for TikTok, Reels, and YouTube Shorts."
        projects={shortFormProjects}
      />

      {/* Chapter 6: Color Grading & Look Dev (Before/After Sliders) */}
      <BeforeAfterSlider 
        title="COLOR GRADING"
        description="Setting the mood. Transforming raw, flat LOG footage into premium cinematic aesthetics using DaVinci Resolve."
        projects={colorProjects}
      />

      {/* Chapter 7: Long-Form & Cinematic (Floating Posters Parallax) */}
      <FloatingPosters 
        title="CINEMATIC JOURNEYS"
        description="Long-form storytelling, travel films, documentaries, and immersive narrative experiences."
        projects={cinematicProjects}
      />

      {/* Chapter 8: Experimental AI & VFX (Interactive Video Wall) */}
      {/* Needs at least a few projects to look good, we pass the experimental ones */}
      <InteractiveVideoWall 
        title="EXPERIMENTAL AI"
        description="Pushing the bleeding edge of generative video, audio-reactive motion, and complex VFX compositing."
        projects={experimentalProjects}
      />

    </main>
  );
};

export default Home;
