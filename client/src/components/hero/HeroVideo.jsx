// src/components/hero/HeroVideo.jsx
const HeroVideo = () => (
  <div className="absolute inset-0 z-0">
    {/* Gradient overlays for cinematic feel */}
    <div className="absolute inset-0 z-10 bg-gradient-to-r from-bg-primary via-bg-primary/70 to-transparent" />
    <div className="absolute inset-0 z-10 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/30" />

    {/* Cinematic dark video placeholder — replace src with your actual reel */}
    <video
      className="w-full h-full object-cover scale-105"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="https://images.unsplash.com/photo-1536240478700-b869ad10a2eb?w=1920&q=60"
    >
      {/* Replace with your actual background video */}
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
    </video>

    {/* Vignette */}
    <div
      className="absolute inset-0 z-10 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.7) 100%)',
      }}
    />
  </div>
);

export default HeroVideo;
