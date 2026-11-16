'use client';

import { useState } from 'react';
import type { ComponentType } from 'react';
import Link from 'next/link';
import { Terminal, ArrowUpRight, CheckCircle2, Layers, Cpu, Layout, Workflow } from 'lucide-react';
import { SpotlightCard } from '@/components/SpotlightCard';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  /** Começa com "/" = página interna do site. Começa com "http" = site externo (abre em nova aba). */
  href: string;
  ctaLabel: string;
  ctaIcon: ComponentType<{ className?: string }>;
  /** Texto ao lado do check verde, no rodapé do card. */
  status: string;
  /** Nome da segunda aba do card. */
  archTabLabel: string;
  /** Comentário que aparece no topo da segunda aba. */
  archComment: string;
  architecture: { file: string; role: string }[];
  /** true = o card ocupa a largura inteira do grid. */
  featured?: boolean;
  /** Números de destaque, mostrados na aba "Visão Geral". */
  metrics?: { value: string; label: string }[];
}

const projects: Project[] = [
  {
    id: 'authentic-crm',
    title: 'Authentic CRM (HubSpot)',
    description:
      'Simulação de funil comercial B2B no HubSpot: pipeline de 5 etapas com probabilidade de fechamento, segmentação de leads por vertical e previsão de receita ponderada. Dados fictícios.',
    category: 'CRM & Marketing Operations',
    tags: ['HubSpot', 'CRM', 'Pipeline de Vendas', 'Segmentação'],
    href: '/projetos/authentic-crm',
    ctaLabel: 'Ver Estudo de Caso',
    ctaIcon: Workflow,
    status: 'Simulação com dados fictícios',
    archTabLabel: 'Estrutura do CRM',
    archComment: '// crm_structure.json',
    featured: true,
    // Se mudar algum valor no HubSpot, atualize aqui e na página do estudo de caso.
    metrics: [
      { value: 'R$ 69.600', label: 'pipeline total' },
      { value: 'R$ 46.560', label: 'valor ponderado' },
      { value: '5', label: 'negócios simulados' },
    ],
    architecture: [
      {
        file: 'Pipeline Authentic - Vendas B2B',
        role: '5 etapas abertas, cada uma com critério de entrada e probabilidade de 20% a 90%',
      },
      {
        file: 'Propriedades de contato',
        role: 'Vertical, Origem do lead e Caso de uso, em listas fechadas para segmentar',
      },
      {
        file: 'Base fictícia',
        role: '4 empresas, 9 contatos e 5 negócios associados entre si',
      },
    ],
  },
  {
    id: 'projeto-authentic',
    title: 'Projeto Authentic (IA & API)',
    description:
      'Aplicação web desenvolvida no ecossistema React, com API integrada para a identificação de inteligência artificial em imagens.',
    category: 'Front-End & API Integration',
    tags: ['React', 'JavaScript', 'API REST', 'Tailwind CSS'],
    href: 'https://projeto-authentic.vercel.app',
    ctaLabel: 'Ver Aplicação',
    ctaIcon: Cpu,
    status: 'Disponível online',
    archTabLabel: 'Estrutura',
    archComment: '// system_breakdown.json',
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
    href: 'https://www.figma.com/design/MrTcW5npNdPRL3gVRFuOOR/Trabalho-UX--Community-?node-id=0-1&t=Shd0zeuW3wbEVjnM-1',
    ctaLabel: 'Ver no Figma',
    ctaIcon: Layout,
    status: 'Disponível online',
    archTabLabel: 'Processo UX',
    archComment: '// system_breakdown.json',
    architecture: [
      { file: 'Design System / Tokens', role: 'Padronização de tipografia, cores e componentes de leitura' },
      { file: 'Wireframing & Flow', role: 'Mapeamento de jornada do usuário na descoberta de títulos' },
      { file: 'Prototipagem High-Fi', role: 'Interações e microanimações de navegação em tela' },
    ],
  },
];

const ctaClass =
  'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-semibold font-mono transition-all active:scale-95';

export function Projects() {
  const [activeTabs, setActiveTabs] = useState<Record<string, 'overview' | 'arch'>>({});

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
          Uma simulação de CRM no HubSpot, aplicações reais desenvolvidas em React e estudos de usabilidade aplicados em interfaces mobile e web.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project) => {
          const currentTab = activeTabs[project.id] || 'overview';
          const isExternal = project.href.startsWith('http');
          const CtaIcon = project.ctaIcon;
          const ctaContent = (
            <>
              <CtaIcon className="w-3.5 h-3.5" />
              <span>{project.ctaLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </>
          );

          return (
            <SpotlightCard
              key={project.id}
              className={`p-7 tactile-glass flex flex-col justify-between border-zinc-800/80 group ${
                project.featured ? 'lg:col-span-2' : ''
              }`}
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
                      {project.archTabLabel}
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
                      <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl">
                        {project.description}
                      </p>

                      {project.metrics && (
                        <div className="grid grid-cols-3 gap-2 max-w-xl">
                          {project.metrics.map((metric) => (
                            <div
                              key={metric.label}
                              className="rounded-lg bg-zinc-950/70 border border-zinc-800/60 px-3 py-2"
                            >
                              <div className="text-sm sm:text-lg font-bold font-mono text-emerald-400">
                                {metric.value}
                              </div>
                              <div className="text-[10px] font-mono text-zinc-500">{metric.label}</div>
                            </div>
                          ))}
                        </div>
                      )}

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
                        <span>{project.archComment}</span>
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

              <div className="pt-6 mt-6 border-t border-zinc-800/60 flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{project.status}</span>
                </div>

                {isExternal ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ctaClass}
                  >
                    {ctaContent}
                  </a>
                ) : (
                  <Link href={project.href} className={ctaClass}>
                    {ctaContent}
                  </Link>
                )}
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}
