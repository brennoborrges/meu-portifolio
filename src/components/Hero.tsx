'use client';

import { ArrowUpRight, Radio, ShieldCheck } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* Coluna de Texto Principal */}
        <div className="lg:col-span-7 space-y-4 text-left">
          
          {/* Badge de Disponibilidade com Mini-Portal */}
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-emerald-500/40 bg-zinc-950 flex items-center justify-center shadow-lg group">
              <video
                autoPlay
                loop
                muted
                playsInline
                ref={(el) => {
                  if (el) {
                    el.muted = true;
                    el.play().catch(() => {});
                  }
                }}
                className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
              >
                <source src="/pixel-art.mp4" type="video/mp4" />
                <source src="/pixel-art.gif" />
              </video>
              <span className="absolute inset-0 bg-emerald-500/10 pointer-events-none" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono tactile-glass">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Disponível para novos projetos & contratos</span>
            </div>
          </div>

          {/* Headline Editorial */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100 leading-[1.2] text-balance">
            Construindo{' '}
            <span className="inline-block px-2.5 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 shadow-sm">
              software moderno
            </span>{' '}
            <span className="inline-flex align-middle mx-1 text-emerald-400 animate-spin-slow hover:text-teal-300 transition-colors cursor-pointer">
              ✦
            </span>{' '}
            com foco em{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
              conversão
            </span>{' '}
            <span className="inline-flex align-middle mx-1 text-teal-400 animate-[spin-slow_8s_linear_infinite] hover:scale-125 transition-transform cursor-pointer">
              ✹
            </span>{' '}
            e dados.
          </h1>

          {/* Descrição */}
          <p className="text-sm text-zinc-400 max-w-lg leading-relaxed">
            Desenvolvimento front-end integrado a fundamentos de Inbound Marketing,
            automação e arquitetura limpa para criar produtos digitais orientados a resultado.
          </p>

          {/* Botões de Ação na Primeira Dobra */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <a
              href="#contato"
              className="relative group overflow-hidden px-6 py-3 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100 font-semibold text-xs transition-all duration-500 hover:border-emerald-400/80 shadow-xl flex items-center justify-center gap-2"
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-110 transition-all duration-700 ease-out pointer-events-none bg-cover bg-center"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, #059669 0%, #0d9488 40%, #09090b 90%)`,
                }}
              />
              <span className="relative z-10 font-mono tracking-wider uppercase flex items-center gap-2">
                Iniciar Conversa
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>

            <a
              href="#projetos"
              className="px-5 py-3 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 font-medium text-xs transition-all text-center spring-bounce tactile-glass"
            >
              Explorar Projetos
            </a>
          </div>
        </div>

        {/* Monitor CRT Pixel Art com Moldura de Hardware */}
        <div className="lg:col-span-5 w-full">
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md overflow-hidden shadow-2xl tactile-glass spring-bounce">
            
            {/* Barra de Topo do Monitor */}
            <div className="px-4 py-2.5 border-b border-zinc-800/80 bg-zinc-950 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] font-mono text-zinc-400 pl-1">live_stream.raw</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-[10px] font-mono bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 text-emerald-400">
                  <Radio className="w-3 h-3 animate-pulse" />
                  <span>60 FPS</span>
                </div>
              </div>
            </div>

            {/* Tela do Monitor */}
            <div className="relative w-full h-65 sm:h-70 overflow-hidden bg-zinc-950">
              <video
                autoPlay
                loop
                muted
                playsInline
                ref={(el) => {
                  if (el) {
                    el.muted = true;
                    el.play().catch(() => {});
                  }
                }}
                className="w-full h-full object-cover filter contrast-105"
              >
                <source src="/pixel-art.mp4" type="video/mp4" />
                <source src="/pixel-art.gif" />
              </video>

              {/* Scanlines CRT sutis */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, transparent 1px, transparent 2px)',
                }}
              />

              {/* Vinheta escura de profundidade */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40 pointer-events-none" />

              {/* Telemetria de Overlay Superior */}
              <div className="absolute top-3 left-3 flex items-center gap-2 text-[10px] font-mono bg-zinc-950/85 px-2.5 py-1 rounded-md border border-zinc-800 backdrop-blur-xs text-zinc-300 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>FEED_01</span>
              </div>

              {/* Telemetria de Overlay Inferior */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono bg-zinc-950/85 px-3 py-1.5 rounded-md border border-zinc-800 backdrop-blur-xs text-zinc-400 shadow-md">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>BAHIA_NODE • FOCUS STATION</span>
                </div>
                <span className="text-emerald-400 font-semibold">STATUS: IN FLOW</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}