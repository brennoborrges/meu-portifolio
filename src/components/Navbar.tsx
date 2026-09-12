'use client';

import { TypewriterLogo } from '@/components/TypewriterLogo';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Identidade / Console Dinâmico */}
        <TypewriterLogo />

        {/* Living Widget Central (Horário Local & Status) */}
        <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full border border-zinc-800/80 bg-zinc-900/50 font-mono text-xs text-zinc-300">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Bahia, BR</span>
          </div>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400">19:45:00</span>
        </div>

        {/* Links de Navegação */}
        <nav className="flex items-center gap-6 text-xs font-mono">
          <a href="#sobre" className="text-zinc-400 hover:text-zinc-100 transition-colors">
            Sobre
          </a>
          <a href="#certificacoes" className="text-zinc-400 hover:text-zinc-100 transition-colors">
            Certificações
          </a>
          <a href="#projetos" className="text-zinc-400 hover:text-zinc-100 transition-colors">
            Projetos
          </a>
          <a
            href="#contato"
            className="px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all font-semibold"
          >
            Contato ↗
          </a>
        </nav>

      </div>
    </header>
  );
}