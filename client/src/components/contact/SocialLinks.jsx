// src/components/contact/SocialLinks.jsx
import { SITE_CONFIG } from '../../utils/constants.js';

const links = [
  {
    name: 'Instagram',
    href: SITE_CONFIG.socials.instagram,
    description: 'Behind-the-scenes & reels',
    color: '#E1306C',
  },
  {
    name: 'YouTube',
    href: SITE_CONFIG.socials.youtube,
    description: 'Full videos & tutorials',
    color: '#FF0000',
  },
  {
    name: 'Vimeo',
    href: SITE_CONFIG.socials.vimeo,
    description: 'Premium portfolio reels',
    color: '#1AB7EA',
  },
  {
    name: 'LinkedIn',
    href: SITE_CONFIG.socials.linkedin,
    description: 'Professional network',
    color: '#0077B5',
  },
  {
    name: 'Behance',
    href: SITE_CONFIG.socials.behance,
    description: 'Motion design work',
    color: '#1769FF',
  },
];

const SocialLinks = () => (
  <div className="space-y-3">
    {links.map((link) => (
      <a
        key={link.name}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between p-4 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group cursor-none"
      >
        <div className="flex items-center gap-4">
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: link.color }}
          />
          <div>
            <div className="text-white font-satoshi font-medium text-sm group-hover:text-white transition-colors">
              {link.name}
            </div>
            <div className="text-white/30 text-xs font-satoshi">{link.description}</div>
          </div>
        </div>
        <svg
          className="w-4 h-4 text-white/20 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    ))}
  </div>
);

export default SocialLinks;
