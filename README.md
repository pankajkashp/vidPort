# 🎬 Premium Cinematic Portfolio — Alex Ray Films

An award-worthy, immersive portfolio website for a Video Editor & AI Filmmaker. Built to feel like entering a luxury movie production studio.

## 🚀 Quick Start

```bash
# Install all dependencies
cd client && npm install
cd ../server && npm install

# Run frontend (localhost:5173)
cd client && npm run dev

# Run backend (localhost:5000)  
cd server && npm run dev
```

## 🗂️ Project Structure

```
portVid/
├── client/          # React + Vite + Tailwind (Frontend)
├── server/          # Express + MongoDB (Backend)
└── package.json     # Workspace scripts
```

## ✏️ Customizing Content

**All content is data-driven — never edit React components to update projects.**

### Update Projects
Edit `client/src/data/projects.json`:
```json
{
  "id": "unique-slug",
  "title": "Project Title",
  "category": "Commercial Ads",
  "client": "Client Name",
  "thumbnail": "https://your-image.jpg",
  "video": "https://your-video.mp4",
  "previewVideo": "https://your-preview.mp4",
  "software": ["Premiere Pro", "After Effects"],
  "duration": "0:30",
  "year": "2025",
  "tags": ["Commercial", "Brand"],
  "featured": true,
  "description": "Project description...",
  "process": "Your process...",
  "challenges": "Challenges faced..."
}
```

### Update Personal Info
Edit `client/src/utils/constants.js` — change name, email, social links, stats.

### Update Skills
Edit `SOFTWARE_SKILLS` array in `client/src/utils/constants.js`.

## 🔧 Environment Variables (Backend)

Copy `server/.env.example` to `server/.env` and fill in:

```
MONGODB_URI=          # Optional: MongoDB connection string
CLOUDINARY_*=         # Optional: Cloudinary for media uploads
EMAIL_USER/PASS=      # Optional: Gmail for contact form
```

## 🌐 Deployment

- **Frontend**: Deploy `client/` to Vercel (`npm run build`)
- **Backend**: Deploy `server/` to Render (auto-detects Node.js)

## 📦 Tech Stack

| Tech | Purpose |
|------|---------|
| React 18 + Vite | Frontend framework |
| Tailwind CSS | Styling |
| GSAP + ScrollTrigger | Scroll animations |
| Lenis | Smooth scroll |
| Framer Motion | Page transitions |
| React Router v6 | Routing |
| Express.js | Backend API |
| MongoDB + Mongoose | Database |
| Cloudinary | Media storage |
| Nodemailer | Contact form |
