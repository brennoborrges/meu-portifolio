'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionEntry {
  id: string;
  label: string;
  title: string;
  content: ReactNode;
}

/**
 * Acordeão de um bloco aberto por vez. O conteúdo continua no HTML mesmo fechado
 * (o Google e os sistemas de recrutamento leem), mas fica fora do teclado via `inert`.
 */
export function AccordionGroup({ items, defaultOpen = null }: { items: AccordionEntry[]; defaultOpen?: string | null }) {
  const [open, setOpen] = useState<string | null>(defaultOpen);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div
            key={item.id}
            className={`rounded-2xl border bg-zinc-900/30 transition-colors duration-300 ${
              isOpen ? 'border-emerald-500/30' : 'border-zinc-800/80 hover:border-zinc-700'
            }`}
          >
            <h3>
              <button
                type="button"
                id={`acc-btn-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={`acc-panel-${item.id}`}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 sm:px-6 sm:py-5"
              >
                <span className="space-y-1">
                  <span className="block text-[11px] font-mono text-emerald-400">{item.label}</span>
                  <span className="block text-base font-semibold text-zinc-100 sm:text-lg">{item.title}</span>
                </span>
                <ChevronDown
                  aria-hidden
                  className={`h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-300 motion-reduce:transition-none ${
                    isOpen ? 'rotate-180 text-emerald-400' : ''
                  }`}
                />
              </button>
            </h3>

            <div
              id={`acc-panel-${item.id}`}
              role="region"
              aria-labelledby={`acc-btn-${item.id}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <div className="space-y-5 px-5 pb-6 sm:px-6">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
