'use client';

import { useState } from 'react';
import { FlaskConical, Volume2, Sparkles, RefreshCw } from 'lucide-react';
import { SpotlightCard } from '@/components/SpotlightCard';

// Síntese procedural de áudio tátil (Zero arquivos externos)
function playProceduralClick(freq = 600, duration = 0.035) {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Silencia em navegadores sem permissão de áudio
  }
}

export function InteractiveLab() {
  // Estado do Keycap Mecânico
  const [isKeyPressed, setIsKeyPressed] = useState(false);
  const [pressCount, setPressCount] = useState(0);

  // Estado do Knob Rotativo (0 a 100)
  const [knobValue, setKnobValue] = useState(45);

  // Estado do Gatilho de Mola
  const [springTension, setSpringTension] = useState(50);
  const [isSnapping, setIsSnapping] = useState(false);

  const handleKeyPress = () => {
    setIsKeyPressed(true);
    setPressCount((c) => c + 1);
    playProceduralClick(750, 0.04);
  };

  const handleKeyRelease = () => {
    setIsKeyPressed(false);
    playProceduralClick(420, 0.025);
  };

  const handleKnobRotate = (step: number) => {
    setKnobValue((prev) => {
      const next = Math.min(100, Math.max(0, prev + step));
      playProceduralClick(300 + next * 5, 0.02);
      return next;
    });
  };

  const handleSpringRelease = () => {
    setIsSnapping(true);
    playProceduralClick(220, 0.08);
    setTimeout(() => {
      setSpringTension(50);
      setIsSnapping(false);
    }, 350);
  };

  return (
    <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-zinc-800/80">
      
      {/* Cabeçalho */}
      <div className="flex flex-col gap-2 mb-12">
        <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase font-mono">
          <FlaskConical className="w-4 h-4" />
          <span>Hardware & UI Lab</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
          Laboratório Tátil
        </h2>
        <p className="text-zinc-400 max-w-xl text-sm leading-relaxed">
          Experimentos com física de molas, curso mecânico e feedback tátil sintetizado diretamente no navegador.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Experimento 1: Keycap Mecânico 3D */}
        <SpotlightCard className="p-6 tactile-glass flex flex-col justify-between border-zinc-800/80">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                Mechanical Switch
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                Linear Red
              </span>
            </div>
            <p className="text-xs text-zinc-500">
              Pressione a tecla física abaixo para sentir o curso de mola e o clique sintetizado por Web Audio.
            </p>
          </div>

          <div className="py-10 flex flex-col items-center justify-center">
            <div className="relative p-2.5 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-inner">
              <button
                type="button"
                onMouseDown={handleKeyPress}
                onMouseUp={handleKeyRelease}
                onMouseLeave={() => isKeyPressed && handleKeyRelease()}
                onTouchStart={handleKeyPress}
                onTouchEnd={handleKeyRelease}
                className={`relative w-20 h-20 rounded-xl font-mono font-bold text-sm select-none transition-all duration-75 flex flex-col items-center justify-center cursor-pointer border ${
                  isKeyPressed
                    ? 'translate-y-2 bg-emerald-500 text-zinc-950 border-emerald-400 shadow-none'
                    : 'translate-y-0 bg-zinc-800 hover:bg-zinc-700/80 text-zinc-200 border-zinc-600 shadow-[0_8px_0_0_#18181b,0_12px_15px_rgba(0,0,0,0.5)] active:translate-y-2'
                }`}
              >
                <span>F8</span>
                <span className="text-[9px] font-normal opacity-70">EXEC</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-500">Ativações:</span>
            <span className="text-emerald-400 font-bold tabular-nums">{pressCount} clicks</span>
          </div>
        </SpotlightCard>

        {/* Experimento 2: Potenciômetro Rotativo (Knob) */}
        <SpotlightCard className="p-6 tactile-glass flex flex-col justify-between border-zinc-800/80">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Rotary Dial
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                Stepped 360°
              </span>
            </div>
            <p className="text-xs text-zinc-500">
              Ajuste os passos do dial para inspecionar a modulação de frequência e o anel de LEDs.
            </p>
          </div>

          <div className="py-8 flex flex-col items-center justify-center">
            <div className="relative w-28 h-28 rounded-full border-2 border-zinc-800 bg-zinc-950 flex items-center justify-center shadow-xl">
              
              {/* Marcador angular giratório */}
              <div
                className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-700/80 flex items-center justify-center relative shadow-lg transition-transform duration-100"
                style={{ transform: `rotate(${(knobValue / 100) * 270 - 135}deg)` }}
              >
                <span className="absolute top-2 w-1.5 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                <span className="w-6 h-6 rounded-full bg-zinc-950 border border-zinc-800" />
              </div>

            </div>

            {/* Controles rápidos de giro */}
            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={() => handleKnobRotate(-5)}
                className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-300 active:scale-95 cursor-pointer"
              >
                - 5°
              </button>
              <button
                type="button"
                onClick={() => handleKnobRotate(5)}
                className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-300 active:scale-95 cursor-pointer"
              >
                + 5°
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-500">Intensidade:</span>
            <span className="text-emerald-400 font-bold tabular-nums">{knobValue}%</span>
          </div>
        </SpotlightCard>

        {/* Experimento 3: Mola Elástica com Snap */}
        <SpotlightCard className="p-6 tactile-glass flex flex-col justify-between border-zinc-800/80">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                Elastic Physics
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                Snap-back
              </span>
            </div>
            <p className="text-xs text-zinc-500">
              Puxe o tensor elástico para a direita ou esquerda e solte para assistir ao recuo físico imediato.
            </p>
          </div>

          <div className="py-10 flex flex-col items-center justify-center w-full px-4">
            <div className="w-full relative py-4">
              <input
                type="range"
                min="0"
                max="100"
                value={springTension}
                onChange={(e) => setSpringTension(Number(e.target.value))}
                onMouseUp={handleSpringRelease}
                onTouchEnd={handleSpringRelease}
                className={`w-full h-2 rounded-lg appearance-none cursor-grab active:cursor-grabbing accent-emerald-400 ${
                  isSnapping ? 'transition-all duration-300 ease-out' : ''
                }`}
                style={{
                  background: `linear-gradient(to right, #10b981 ${springTension}%, #27272a ${springTension}%)`,
                }}
              />
            </div>
            <span className="text-[11px] font-mono text-zinc-500 mt-2">
              {isSnapping ? 'Recuo elástico amortecido...' : 'Arraste e solte o cursor'}
            </span>
          </div>

          <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-500">Tensão atual:</span>
            <span className="text-emerald-400 font-bold tabular-nums">{springTension} N</span>
          </div>
        </SpotlightCard>

      </div>

    </section>
  );
}