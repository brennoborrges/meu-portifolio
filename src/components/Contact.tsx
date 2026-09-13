'use client';

import { useState } from 'react';
import { Copy, Check, Send, Sparkles, ShieldCheck } from 'lucide-react';
import { SpotlightCard } from '@/components/SpotlightCard';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const [botField, setBotField] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const email = 'brennogabrielp53@gmail.com';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback gracioso
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Se o bot invisível preencher o campo, não envia (proteção anti-spam)
    if (botField.trim() !== '') {
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch('https://formspree.io/f/myeyqylp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          nome: formData.name,
          email: formData.email,
          mensagem: formData.message,
        })
      });

      if (response.ok) {
        setSentSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        // Mantém a mensagem de sucesso visível por 4 segundos
        setTimeout(() => setSentSuccess(false), 4000);
      } else {
        alert("Ocorreu um erro ao enviar a mensagem. Tente novamente.");
      }
   } catch (error) {
      console.error("Erro no envio do formulário:", error);
      alert("Erro de conexão. Verifique sua rede e tente novamente.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contato" className="py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-zinc-800/80">
      
      <div className="flex flex-col gap-2 mb-12">
        <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase font-mono">
          <Sparkles className="w-4 h-4" />
          <span>Inicie um Projeto</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
          Vamos Trabalhar Juntos
        </h2>
        <p className="text-zinc-400 max-w-xl text-sm leading-relaxed">
          Tem uma proposta de produto, projeto sob medida ou oportunidade técnica? Envie uma mensagem direta ou copie o canal de contato rápido.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-5 space-y-4">
          <SpotlightCard className="p-6 tactile-glass border-zinc-800/80 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                CANAL DIRETO
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                RESPOSTA &lt; 24H
              </span>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-zinc-400 block">Endereço de E-mail:</span>
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-200">
                <span className="truncate">{email}</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white transition-all cursor-pointer"
                  title="Copiar e-mail"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              {copied && (
                <span className="text-[11px] font-mono text-emerald-400 block animate-fadeIn">
                  ✓ Copiado para a área de transferência!
                </span>
              )}
            </div>

            <div className="pt-4 space-y-4 border-t border-zinc-800/60">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>Localização: Candeias, BA</span>
                <span className="text-emerald-400">ONLINE</span>
              </div>

              {/* Estilo da animação do degradê vivo */}
              <style>{`
                @keyframes mosaico {
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                }
                .bg-mosaico {
                  background-size: 200% 200%;
                  animation: mosaico 3s ease infinite;
                }
              `}</style>

              {/* Redes Sociais */}
              <div className="flex items-center gap-3">
                
                {/* LinkedIn - Degradê Azul Vivo */}
                <a
                  href="https://www.linkedin.com/in/brenno-gabriel-a79288293/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-center w-10 h-10 rounded-lg group"
                  aria-label="LinkedIn"
                >
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 via-blue-700 to-cyan-400 bg-mosaico opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-[1px] bg-zinc-950 rounded-lg"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform duration-300"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                
                {/* GitHub - Degradê Metálico (Branco/Cinza) */}
                <a
                  href="https://github.com/brennoborrges"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-center w-10 h-10 rounded-lg group"
                  aria-label="GitHub"
                >
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-zinc-500 via-zinc-100 to-zinc-600 bg-mosaico opacity-70 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-[1px] bg-zinc-950 rounded-lg"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 w-4 h-4 text-zinc-200 group-hover:scale-110 transition-transform duration-300"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>

                {/* Instagram - Degradê Rosa/Amarelo/Roxo */}
                <a
                  href="https://www.instagram.com/brenn_0o/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-center w-10 h-10 rounded-lg group"
                  aria-label="Instagram"
                >
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-mosaico opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-[1px] bg-zinc-950 rounded-lg"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform duration-300"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>

              </div>
            </div>
          </SpotlightCard>
        </div>

        <div className="lg:col-span-7">
          <SpotlightCard className="p-6 sm:p-8 tactile-glass border-zinc-800/80">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Não preencha este campo:</label>
                <input
                  id="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 block">Nome:</label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs focus:outline-hidden focus:border-emerald-500/60 font-mono transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 block">E-mail corporativo:</label>
                  <input
                    type="email"
                    required
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs focus:outline-hidden focus:border-emerald-500/60 font-mono transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-400 block">Mensagem ou briefing do projeto:</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Compartilhe os detalhes da proposta..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs focus:outline-hidden focus:border-emerald-500/60 font-mono transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-zinc-500">
                  {sentSuccess ? (
                    <span className="text-emerald-400 font-semibold animate-fadeIn">
                      ✓ Mensagem encaminhada com sucesso!
                    </span>
                  ) : (
                    '// Encaminhamento direto e seguro'
                  )}
                </span>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono font-semibold text-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSending ? (
                    <span>Processando...</span>
                  ) : (
                    <>
                      <span>Transmitir Mensagem</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </SpotlightCard>
        </div>

      </div>

    </section>
  );
}