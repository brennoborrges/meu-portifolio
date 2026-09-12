'use client';

import { Award, CheckCircle2, BookOpen, FileText, ExternalLink } from 'lucide-react';
import { SpotlightCard } from '@/components/SpotlightCard';

const certifications = [
  {
    title: 'Desenvolvedor de Sistemas',
    institution: 'SENAI',
    description: 'Foco em lógica de programação, orientação a objetos, Java e banco de dados SQL (350h).',
    badge: 'Formação Técnica',
    pdfUrl: '/certificados/Certificado DEVDESISTEMAS.pdf',
  },
  {
    title: 'Front-End em React (Fase 1)',
    institution: 'CEPEDI / IFBA',
    description: 'Capacitação prática em ecossistema React, componentes e estruturação de interfaces modernas (144h).',
    badge: 'Capacitação',
    pdfUrl: '/certificados/Certificado Front-End com React.pdf',
  },
  {
    title: 'Programa Jovens Conectados & Jornada Jovem Acelen',
    institution: 'AVSI Brasil / ACELEN',
    description: 'Desenvolvimento de competências profissionais, preparação para o mercado e inovação (90h).',
    badge: 'Programa Corporativo',
    pdfUrl: '/certificados/Certificado Jornada Jovem Acelen.pdf',
  },
  {
    title: 'Certificação Google Analytics (GA4)',
    institution: 'Google Analytics Certified',
    description: 'Comprovação de competência em análise de métricas, eventos e medição de dados digitais.',
    badge: 'Dados & Analytics',
    pdfUrl: '/certificados/Certificado GA4.pdf',
  },
  {
    title: 'Certificado de Inbound Marketing',
    institution: 'HubSpot Academy',
    description: 'Domínio de estratégias de atração, conversão e nutrição de leads focadas em metodologias de flywheel.',
    badge: 'Marketing & Conversão',
    pdfUrl: '/certificados/Certificado Inbound Marketing.png',
  },
  {
    title: 'Certificado de Inbound',
    institution: 'HubSpot Academy',
    description: 'Fundamentos da metodologia Inbound para atração e engajamento de clientes em potencial.',
    badge: 'Marketing & Conversão',
    pdfUrl: '/certificados/Certificado Inbound.png',
  },
  {
    title: 'Inglês Intermediário',
    institution: 'NESC Idiomas',
    description: 'Compreensão técnica, leitura de documentações e comunicação funcional.',
    badge: 'Idioma',
    pdfUrl: '',
  },
];

export function Certifications() {
  return (
    <section id="certificacoes" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-zinc-800/80">
      
      <div className="flex flex-col gap-2 mb-12">
        <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase font-mono">
          <Award className="w-4 h-4" />
          <span>Credenciais & Formação</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
          Cursos e Certificações
        </h2>
        <p className="text-zinc-400 max-w-xl text-sm leading-relaxed">
          Base técnica sólida em desenvolvimento, dados e programas de aceleração profissional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <SpotlightCard
            key={cert.title}
            className="p-6 tactile-glass flex flex-col justify-between border-zinc-800/80 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {cert.badge}
                </span>
                <BookOpen className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
              </div>

              <div>
                <h3 className="text-base font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                  {cert.title}
                </h3>
                <span className="text-xs font-mono text-emerald-300 block mt-0.5">
                  {cert.institution}
                </span>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed">
                {cert.description}
              </p>
            </div>

            <div className="space-y-4 pt-4 mt-6 border-t border-zinc-800/60">
              {cert.pdfUrl ? (
                <a
                  href={cert.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-teal-300 transition-colors bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg w-full justify-center group/btn"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Ver Comprovante Oficial</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              ) : (
                <div className="text-[11px] font-mono text-zinc-500 text-center py-1.5">
                  Formação Complementar
                </div>
              )}

              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Validado</span>
                </span>
                <span>Oficial</span>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>

    </section>
  );
}