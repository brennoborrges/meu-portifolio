'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Search,
  Terminal,
  FolderGit2,
  Award,
  User,
  Copy,
  Check,
  CornerDownLeft,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';

// Sintetizador de clique tátil usando Web Audio API nativa
function playTactileClick(frequency = 600, duration = 0.03) {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Silencia se o navegador bloquear autoplay
  }
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [d20Roll, setD20Roll] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const triggerSound = useCallback(
    (freq = 600) => {
      if (soundEnabled) playTactileClick(freq);
    },
    [soundEnabled]
  );

  const actions = useMemo(
    () => [
      {
        id: 'projetos',
        title: 'Navegar: Cases em Destaque',
        icon: FolderGit2,
        perform: () => {
          document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' });
        },
      },
      {
        id: 'certificacoes',
        title: 'Navegar: Credenciais & HubSpot',
        icon: Award,
        perform: () => {
          document.getElementById('certificacoes')?.scrollIntoView({ behavior: 'smooth' });
        },
      },
      {
        id: 'sobre',
        title: 'Navegar: Arquitetura & Identidade',
        icon: User,
        perform: () => {
          document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' });
        },
      },
      {
        id: 'email',
        title: 'Copiar Chave Direta de Contato',
        icon: copied ? Check : Copy,
        perform: () => {
          navigator.clipboard.writeText('brennogabrielp53@gmail.com');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        },
      },
      {
        id: 'd20',
        title: 'Easter Egg: Rolar D20 de Iniciativa Dev',
        icon: Sparkles,
        perform: () => {
          const roll = Math.floor(Math.random() * 20) + 1;
          setD20Roll(roll);
        },
      },
    ],
    [copied]
  );

  const filtered = useMemo(() => {
    return actions.filter((act) =>
      act.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [actions, search]);

  // Listener global de atalho (Ctrl + K / ⌘K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        triggerSound(750);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, triggerSound]);

  // Navegação pelo teclado dentro do modal
  useEffect(() => {
    if (!isOpen) return;

    const handleNavigation = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        triggerSound(400);
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        triggerSound(450);
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        triggerSound(900);
        filtered[selectedIndex].perform();
        if (filtered[selectedIndex].id !== 'd20') {
          setIsOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleNavigation);
    return () => window.removeEventListener('keydown', handleNavigation);
  }, [isOpen, filtered, selectedIndex, triggerSound]);

  return (
    <>
      {/* Botão Flutuante Discreto no Canto Inferior Direito (Quick Dock) */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <button
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            if (!soundEnabled) playTactileClick(800);
          }}
          className="p-2.5 rounded-xl border border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-all tactile-glass active:scale-95"
          title={soundEnabled ? 'Silenciar som tátil' : 'Ativar som tátil'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
        </button>

        <button
          onClick={() => {
            setIsOpen(true);
            triggerSound(700);
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md text-xs font-mono text-zinc-400 hover:text-zinc-200 hover:border-emerald-500/50 transition-all tactile-glass active:scale-95"
        >
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>Comandos</span>
          <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Modal / Backdrop da Command Palette */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-zinc-950/80 backdrop-blur-sm animate-fadeIn">
          <div
            className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900/95 backdrop-blur-xl shadow-2xl overflow-hidden tactile-glass"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Campo de Busca */}
            <div className="p-4 border-b border-zinc-800/80 flex items-center gap-3">
              <Search className="w-4 h-4 text-zinc-500" />
              <input
                type="text"
                autoFocus
                placeholder="Digite um comando ou navegue..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                  triggerSound(500);
                }}
                className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none font-mono"
              />
              <kbd className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-500">
                ESC
              </kbd>
            </div>

            {/* Resultado do D20 Easter Egg */}
            {d20Roll !== null && (
              <div className="px-4 py-3 bg-emerald-500/10 border-b border-emerald-500/20 flex items-center justify-between font-mono text-xs text-emerald-400">
                <span>🎲 Iniciativa rolada no d20:</span>
                <span className="text-base font-bold">
                  {d20Roll} {d20Roll === 20 ? '(CRÍTICO! 🔥)' : d20Roll === 1 ? '(FALHA CRÍTICA! 💀)' : ''}
                </span>
              </div>
            )}

            {/* Lista de Ações */}
            <div className="p-2 max-h-72 overflow-y-auto space-y-1">
              {filtered.length === 0 ? (
                <div className="p-6 text-center text-xs text-zinc-500 font-mono">
                  Nenhum comando encontrado.
                </div>
              ) : (
                filtered.map((action, index) => {
                  const Icon = action.icon;
                  const isSelected = index === selectedIndex;

                  return (
                    <div
                      key={action.id}
                      onMouseEnter={() => setSelectedIndex(index)}
                      onClick={() => {
                        triggerSound(900);
                        action.perform();
                        if (action.id !== 'd20') setIsOpen(false);
                      }}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer text-xs font-mono transition-colors ${
                        isSelected
                          ? 'bg-zinc-800 text-zinc-100 border border-zinc-700/60'
                          : 'text-zinc-400 hover:bg-zinc-800/40 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-zinc-500'}`} />
                        <span className="font-medium">{action.title}</span>
                      </div>
                      {isSelected && (
                        <div className="flex items-center gap-1 text-zinc-500">
                          <CornerDownLeft className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Rodapé da Paleta */}
            <div className="px-4 py-2.5 border-t border-zinc-800/80 bg-zinc-950/60 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <div className="flex items-center gap-2">
                <span>Navegar</span>
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">↑↓</kbd>
                <span>Selecionar</span>
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">↵</kbd>
              </div>
              <span className="text-emerald-400/80">brenno.terminal v2.0</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}