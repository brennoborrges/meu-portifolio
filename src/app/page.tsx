import { Navbar } from '@/components/Navbar';
import { ImpactSimulator } from '@/components/ImpactSimulator';
import { Hero } from '@/components/Hero';
import { TechMarquee } from '@/components/TechMarquee';
import { About } from '@/components/About';
import { Certifications } from '@/components/Certifications';
import { Projects } from '@/components/Projects';
import { InteractiveLab } from '@/components/InteractiveLab';
import { TypewriterLogo } from '@/components/TypewriterLogo';
import { Contact } from '@/components/Contact';

import { CommandPalette } from '@/components/CommandPalette';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500 selection:text-zinc-950 font-sans relative overflow-x-hidden">
      
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/12 blur-[140px] animate-aurora-1" />
        <div className="absolute top-1/3 -right-24 w-[450px] h-[450px] rounded-full bg-teal-500/10 blur-[130px] animate-aurora-2" />
        <div className="absolute bottom-1/4 left-10 w-[550px] h-[550px] rounded-full bg-indigo-500/10 blur-[160px] animate-aurora-1" />
        
        {/* Malha técnica suave */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(to right, #3f3f46 1px, transparent 1px), linear-gradient(to bottom, #3f3f46 1px, transparent 1px)',
            backgroundSize: '4rem 4rem',
            maskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, #000 60%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, #000 60%, transparent 100%)',
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <TechMarquee />
          <About />
          <Certifications />
          <ImpactSimulator />
          <InteractiveLab />
          <TypewriterLogo />
          <Projects />
          <Contact />
        <CommandPalette />
        </main>


        <footer className="py-10 border-t border-zinc-900 bg-zinc-950/60 backdrop-blur-md text-center text-xs text-zinc-500 font-mono">
          <p>© {new Date().getFullYear()} • Projetado com foco em arquitetura limpa, performance e conversão.</p>
        </footer>
      </div>
    </div>
  );
}