'use client';

import { useState, useMemo } from 'react';
import { Sliders, Gauge, Zap, TrendingUp, CheckCircle2 } from 'lucide-react';
import { SpotlightCard } from '@/components/SpotlightCard';

export function ImpactSimulator() {
  const [traffic, setTraffic] = useState(15000);
  const [currentConversion, setCurrentConversion] = useState(1.8);
  const [ticket, setTicket] = useState(250);
  const [enableSpeedOpt, setEnableSpeedOpt] = useState(true);
  const [enableInboundOpt, setEnableInboundOpt] = useState(true);

  // Cálculo de projeção em tempo real
  const results = useMemo(() => {
    let convMultiplier = 1;
    if (enableSpeedOpt) convMultiplier += 0.28; // +28% por Core Web Vitals e LCP < 1s
    if (enableInboundOpt) convMultiplier += 0.35; // +35% por funis inbound e qualificação

    const projectedConversion = currentConversion * convMultiplier;
    const currentLeads = Math.round((traffic * (currentConversion / 100)));
    const projectedLeads = Math.round((traffic * (projectedConversion / 100)));
    const additionalLeads = projectedLeads - currentLeads;
    const additionalRevenue = additionalLeads * ticket;

    return {
      currentLeads,
      projectedLeads,
      additionalLeads,
      additionalRevenue,
      projectedConversion: projectedConversion.toFixed(2),
    };
  }, [traffic, currentConversion, ticket, enableSpeedOpt, enableInboundOpt]);

  return (
    <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-zinc-800/80">
      
      {/* Cabeçalho */}
      <div className="flex flex-col gap-2 mb-12">
        <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase font-mono">
          <Sliders className="w-4 h-4" />
          <span>Interactive Benchmark</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
          Simulador de Conversão & ROI
        </h2>
        <p className="text-zinc-400 max-w-xl text-sm leading-relaxed">
          Manipule os parâmetros abaixo para projetar o impacto de uma arquitetura front-end ultraveloz combinada com automação estratégica de Inbound.
        </p>
      </div>

      <SpotlightCard className="p-6 sm:p-8 tactile-glass border-zinc-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Coluna Esquerda: Controles Táteis (Sliders & Switches) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Slider 1: Tráfego Mensal */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-400">Tráfego Mensal Estimado:</span>
                <span className="text-emerald-400 font-bold text-sm tabular-nums">
                  {traffic.toLocaleString('pt-BR')} visitantes/mês
                </span>
              </div>
              <input
                type="range"
                min="2000"
                max="100000"
                step="1000"
                value={traffic}
                onChange={(e) => setTraffic(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Slider 2: Taxa de Conversão Atual */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-400">Taxa de Conversão Base:</span>
                <span className="text-emerald-400 font-bold text-sm tabular-nums">
                  {currentConversion.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={currentConversion}
                onChange={(e) => setCurrentConversion(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Slider 3: Valor por Lead / Ticket Médio */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-400">Valor Médio por Lead / Venda:</span>
                <span className="text-emerald-400 font-bold text-sm tabular-nums">
                  R$ {ticket.toLocaleString('pt-BR')}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="1500"
                step="25"
                value={ticket}
                onChange={(e) => setTicket(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            {/* Alavancas Táteis (Switches estilo Hardware) */}
            <div className="pt-4 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              <button
                type="button"
                onClick={() => setEnableSpeedOpt(!enableSpeedOpt)}
                className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  enableSpeedOpt
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-zinc-100 shadow-sm'
                    : 'border-zinc-800 bg-zinc-950/60 text-zinc-500'
                }`}
              >
                <div className="space-y-0.5">
                  <span className="text-xs font-mono font-semibold flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    Next.js Speed Engine
                  </span>
                  <span className="text-[10px] text-zinc-400">LCP &lt; 0.8s (+28% conv)</span>
                </div>
                <span className={`w-3 h-3 rounded-full ${enableSpeedOpt ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-700'}`} />
              </button>

              <button
                type="button"
                onClick={() => setEnableInboundOpt(!enableInboundOpt)}
                className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  enableInboundOpt
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-zinc-100 shadow-sm'
                    : 'border-zinc-800 bg-zinc-950/60 text-zinc-500'
                }`}
              >
                <div className="space-y-0.5">
                  <span className="text-xs font-mono font-semibold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    Funil Inbound Ativo
                  </span>
                  <span className="text-[10px] text-zinc-400">Nutrição & CRM (+35% conv)</span>
                </div>
                <span className={`w-3 h-3 rounded-full ${enableInboundOpt ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-700'}`} />
              </button>

            </div>

          </div>

          {/* Coluna Direita: Dashboard de Telemetria Projetada */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col justify-between space-y-6">
            
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                {'// telemetry_projection.out'}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                PROJEÇÃO REAL
              </span>
            </div>

            {/* Métrica 1: Leads Adicionais */}
            <div className="space-y-1">
              <span className="text-xs font-mono text-zinc-500">Geração de Leads Adicionais:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tabular-nums tracking-tight">
                  +{results.additionalLeads.toLocaleString('pt-BR')}
                </span>
                <span className="text-xs font-mono text-zinc-400">leads/mês</span>
              </div>
              <p className="text-[11px] text-zinc-500">
                De {results.currentLeads} para {results.projectedLeads} leads mensais qualificados.
              </p>
            </div>

            {/* Métrica 2: Faturamento Adicional Projetado */}
            <div className="space-y-1 pt-2 border-t border-zinc-800/60">
              <span className="text-xs font-mono text-zinc-500">Impacto Estimado em Faturamento:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-zinc-100 font-mono tabular-nums tracking-tight">
                  R$ {results.additionalRevenue.toLocaleString('pt-BR')}
                </span>
                <span className="text-xs font-mono text-emerald-400">/mês adicionais</span>
              </div>
              <p className="text-[11px] text-zinc-500">
                Taxa de conversão recalibrada para{' '}
                <span className="text-emerald-400 font-semibold">{results.projectedConversion}%</span>.
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-800/60 flex items-center gap-2 text-[11px] font-mono text-zinc-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Dados calculados com benchmarks do Google & HubSpot.</span>
            </div>

          </div>

        </div>
      </SpotlightCard>

    </section>
  );
}