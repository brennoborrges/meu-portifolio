'use client';

import { useState } from 'react';
import { Terminal, ArrowUpRight, CheckCircle2, Layers, Cpu, Layout } from 'lucide-react';
import { SpotlightCard } from '@/components/SpotlightCard';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  liveUrl: string;
  architecture: { file: string; role: string }[];
}

const projects: Project[] = [
  {
    id: 'projeto-authentic',
    title: 'Projeto Authentic (IA & API)',
    description:
      'Aplicação web desenvolvida no ecossistema React, com API integrada para a identificação de inteligência artificial em imagens.',
    category: 'Front-End & API Integration',
    tags: ['React', 'JavaScript', 'API REST', 'Tailwind CSS'],
    liveUrl: 'https://projeto-authentic.vercel.app',
    architecture: [
      { file: 'src/services/api.js', role: 'Integração e tratamento de payload com API externa' },
      { file: 'src/components/Analyzer.tsx', role: 'Processamento e renderização de estados de imagem' },
      { file: 'src/App.jsx', role: 'Gerenciamento de rotas e ciclo de vida da aplicação' },
    ],
  },
  {
    id: 'ui-ux-livros',
    title: 'Interface de Aplicativo de Livros (UI/UX)',
    description:
      'Projeto acadêmico de design de produto desenvolvido no Figma. Focado na criação de uma interface limpa e intuitiva, aplicando métodos e fundamentos de usabilidade.',
    category: 'Product Design & UX/UI',
    tags: ['Figma', 'UX Research', 'Prototipagem', 'Design Systems'],
    liveUrl: 'https://www.figma.com/design/k5ujEHfB27Zs32INuSpCmo/Trabalho-UX',
    architecture: [
      { file: 'Design System / Tokens', role: 'Padronização de tipografia, cores e componentes de leitura' },
      { file: 'Wireframing & Flow', role: 'Mapeamento de jornada do usuário na descoberta de títulos' },
      { file: 'Prototipagem High-Fi', role: 'Interações e microanimações de navegação em tela' },
    ],
  },
];

export function Projects() {
  const [activeTabs, setActiveTabs] = useState<Record<string, 'overview' | 'arch'>>({
    'projeto-authentic': 'overview',
    'ui-ux-livros': 'overview',
  });

  const setTab = (projectId: string, tab: 'overview' | 'arch') => {
    setActiveTabs((prev) => ({ ...prev, [projectId]: tab }));
  };

  return (
    <section id="projetos" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-zinc-800/80">
      
      <div className="flex flex-col gap-2 mb-12">
        <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase font-mono">
          <Layers className="w-4 h-4" />
          <span>Portfólio Prático</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
          Projetos Desenvolvidos
        </h2>
        <p className="text-zinc-400 max-w-xl text-sm leading-relaxed">
          Aplicações reais desenvolvidas em React e estudos de usabilidade aplicados em interfaces mobile e web.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project) => {
          const currentTab = activeTabs[project.id] || 'overview';

          return (
            <SpotlightCard
              key={project.id}
              className="p-7 tactile-glass flex flex-col justify-between border-zinc-800/80 group"
            >
              <div className="space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-mono text-zinc-400">{project.category}</span>
                  </div>

                  <div className="flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-800 text-[11px] font-mono">
                    <button
                      onClick={() => setTab(project.id, 'overview')}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        currentTab === 'overview'
                          ? 'bg-zinc-800 text-emerald-400 font-medium'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      Visão Geral
                    </button>
                    <button
                      onClick={() => setTab(project.id, 'arch')}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        currentTab === 'arch'
                          ? 'bg-zinc-800 text-emerald-400 font-medium'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {project.id === 'projeto-authentic' ? 'Estrutura' : 'Processo UX'}
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                </div>

                <div className="min-h-36 flex flex-col justify-center">
                  {currentTab === 'overview' && (
                    <div className="space-y-4 animate-fadeIn">
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-zinc-950/80 border border-zinc-800 text-zinc-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentTab === 'arch' && (
                    <div className="space-y-2 font-mono text-xs animate-fadeIn">
                      <div className="text-[11px] text-zinc-500 pb-1 flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{'// system_breakdown.json'}</span>
                      </div>
                      {project.architecture.map((arch) => (
                        <div
                          key={arch.file}
                          className="p-2 rounded-lg bg-zinc-950/70 border border-zinc-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]"
                        >
                          <span className="text-emerald-300 font-semibold">{arch.file}</span>
                          <span className="text-zinc-500 text-[10px]">{arch.role}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-800/60 flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Disponível online</span>
                </div>

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-semibold font-mono transition-all active:scale-95"
                >
                  {project.id === 'projeto-authentic' ? <Cpu className="w-3.5 h-3.5" /> : <Layout className="w-3.5 h-3.5" />}
                  <span>{project.id === 'projeto-authentic' ? 'Ver Aplicação' : 'Ver no Figma'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}