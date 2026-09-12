'use client';

const techStack = [
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript (ES6+)',
  'Angular',
  'Tailwind CSS',
  'Vite',
  'HTML5 / CSS3',
  'Java',
  'SQL',
  'GA4 & GTM',
  'SEO',
  'WordPress & Elementor',
  'Power BI & Excel',
  'Linux (Fedora)',
  'Figma / UX-UI',
];

export function TechMarquee() {
  return (
    <div className="w-full border-y border-zinc-800/80 bg-zinc-950/60 py-4 overflow-hidden relative">
      <div className="flex w-max animate-marquee space-x-8 px-4 font-mono text-xs text-zinc-400">
        {techStack.concat(techStack).map((tech, index) => (
          <div
            key={`${tech}-${index}`}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/50 border border-zinc-800/80 hover:border-emerald-500/40 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-zinc-300">{tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
}