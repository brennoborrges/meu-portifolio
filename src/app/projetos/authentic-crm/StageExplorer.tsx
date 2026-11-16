'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

export interface StageItem {
  name: string;
  prob: number;
  rule: string;
  deal?: { name: string; vertical: string; value: number };
}

const brl = (n: number) => `R$ ${n.toLocaleString('pt-BR')}`;

// useLayoutEffect no navegador, useEffect no servidor (evita aviso de SSR).
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function StageExplorer({ stages }: { stages: StageItem[] }) {
  const [active, setActive] = useState(0);
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const measure = useCallback(() => {
    const el = tabRefs.current[active];
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
  }, [active]);

  useIsoLayoutEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  // No celular, mantém a aba ativa visível dentro da faixa rolável.
  useEffect(() => {
    tabRefs.current[active]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [active]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = e.key === 'ArrowRight' ? (active + 1) % stages.length : (active - 1 + stages.length) % stages.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const stage = stages[active];
  const weighted = stage.deal ? Math.round((stage.deal.value * stage.prob) / 100) : 0;

  return (
    <div className="space-y-4">
      <style>{`
        @keyframes crm-stage-in {
          from { opacity: 0; transform: translateY(8px); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0);   filter: blur(0); }
        }
        @keyframes crm-bar-grow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .crm-stage-in { animation: crm-stage-in 380ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        .crm-bar-grow { transform-origin: left; animation: crm-bar-grow 650ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .crm-stage-in, .crm-bar-grow { animation: none; }
        }
      `}</style>

      {/* Abas com indicador deslizante */}
      <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        <div
          role="tablist"
          aria-label="Etapas do pipeline"
          onKeyDown={onKeyDown}
          className="relative inline-flex min-w-full gap-1 rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-1"
        >
          <span
            aria-hidden
            className={`absolute top-1 bottom-1 rounded-lg bg-zinc-800 shadow-[inset_0_0_0_1px_rgba(52,211,153,0.35)] motion-reduce:transition-none ${
              pill.ready ? 'transition-[left,width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]' : ''
            }`}
            style={{ left: pill.left, width: pill.width }}
          />
          {stages.map((s, i) => (
            <button
              key={s.name}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`crm-tab-${i}`}
              aria-selected={i === active}
              aria-controls="crm-stage-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={`relative z-10 flex-1 whitespace-nowrap rounded-lg px-4 py-2.5 text-xs font-mono transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 ${
                i === active ? 'text-emerald-300' : 'text-zinc-500 hover:text-zinc-200'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Painel da etapa */}
      <div
        id="crm-stage-panel"
        role="tabpanel"
        aria-labelledby={`crm-tab-${active}`}
        className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-8"
      >
        <div key={active} className="crm-stage-in grid gap-8 sm:grid-cols-5">
          <div className="sm:col-span-2 space-y-4">
            <div className="text-xs font-mono text-zinc-500">Chance de fechamento</div>
            <div className="text-5xl sm:text-6xl font-bold font-mono tracking-tight text-emerald-400">{stage.prob}%</div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
              <div className="crm-bar-grow h-full rounded-full bg-emerald-400" style={{ width: `${stage.prob}%` }} />
            </div>
          </div>

          <div className="sm:col-span-3 space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-tight text-zinc-100">{stage.name}</h3>
              <p className="text-[15px] leading-7 text-zinc-300">
                <span className="text-zinc-500">Entra nesta etapa quando: </span>
                {stage.rule}.
              </p>
            </div>

            {stage.deal && (
              <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-4 space-y-3">
                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-zinc-500">Negócio simulado nesta etapa · {stage.deal.vertical}</div>
                  <div className="text-sm font-semibold leading-6 text-zinc-100">{stage.deal.name}</div>
                </div>
                <dl className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <dt className="text-zinc-500">Valor</dt>
                    <dd className="mt-0.5 text-sm text-zinc-200">{brl(stage.deal.value)}</dd>
                  </div>
                  <div>
                    <dt className="text-zinc-500">Valor ponderado</dt>
                    <dd className="mt-0.5 text-sm text-emerald-300">{brl(weighted)}</dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-[11px] font-mono text-zinc-500">
        Além destas 5 etapas abertas, o pipeline tem Fechado ganho (100%) e Fechado perdido (0%). Use as setas do teclado
        para trocar de etapa.
      </p>
    </div>
  );
}
