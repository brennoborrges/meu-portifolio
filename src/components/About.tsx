'use client';

import { Terminal, User, Briefcase, GraduationCap } from 'lucide-react';
import { SpotlightCard } from '@/components/SpotlightCard';

export function About() {
  return (
    <section id="sobre" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-zinc-800/80">
      
      <div className="flex flex-col gap-2 mb-12">
        <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase font-mono">
          <User className="w-4 h-4" />
          <span>Background & Perfil</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
          Sobre Mim
        </h2>
        <p className="text-zinc-400 max-w-xl text-sm leading-relaxed">
          Estudante de Publicidade e Propaganda e Desenvolvedor Front-End atuando na interseção entre tecnologia, dados e negócios.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Coluna de Narrativa Profissional */}
        <div className="lg:col-span-7 space-y-6">
          <SpotlightCard className="p-7 tactile-glass border-zinc-800/80 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 pb-2 border-b border-zinc-800">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>profile_summary.md</span>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed">
              Minha trajetória une o desenvolvimento front-end com a visão analítica de comunicação e marketing. Busco atuar na evolução de produtos digitais combinando código limpo, análise de métricas (GA4, GTM) e fundamentos sólidos de SEO.
            </p>

            <p className="text-sm text-zinc-400 leading-relaxed">
              Com formação técnica em Sistemas de Desenvolvimento pelo SENAI e capacitação em React pelo CEPEDI/IFBA, consigo transitar com facilidade entre a construção de interfaces eficientes e a compreensão lógica de back-end e banco de dados SQL.
            </p>
          </SpotlightCard>
        </div>

        {/* Coluna de Acadêmico & Foco */}
        <div className="lg:col-span-5 space-y-4">
          
          <SpotlightCard className="p-6 tactile-glass border-zinc-800/80 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 pb-2 border-b border-zinc-800">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
              <span>FORMAÇÃO SUPERIOR</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-100">Publicidade e Propaganda</h3>
              <p className="text-xs font-mono text-emerald-300 mt-0.5">UniFTC • 06/2024 - Atual</p>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Foco em comportamento do consumidor, estratégia digital, métricas de conversão e comunicação orientada a resultados.
              </p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-6 tactile-glass border-zinc-800/80 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 pb-2 border-b border-zinc-800">
              <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
              <span>DISPONIBILIDADE</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-zinc-200 font-medium">Imediata para trabalho</p>
              <p className="text-xs font-mono text-zinc-400">Turnos: Manhã e Tarde</p>
              <p className="text-xs font-mono text-emerald-400 pt-1">Candeias, BA & Região / Remoto</p>
            </div>
          </SpotlightCard>

        </div>

      </div>

    </section>
  );
}