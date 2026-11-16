import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Authentic CRM (HubSpot) | Estudo de caso',
  description:
    'Simulação de funil comercial B2B no HubSpot: pipeline de 5 etapas, segmentação de leads por vertical e previsão de receita ponderada. Dados fictícios.',
};

/* ------------------------------------------------------------------ */
/* DADOS DO PROJETO                                                    */
/* Os números da página são calculados a partir desta lista, então     */
/* mudar um valor aqui atualiza total, ponderado e gráfico sozinhos.   */
/* ------------------------------------------------------------------ */

const IMG = '/projetos/authentic-crm';

// Critérios de entrada: são os textos que estão na coluna "Descrição da etapa" do HubSpot.
const stages = [
  { name: 'Lead novo', prob: '20%', rule: 'Contato sem conversa qualificada' },
  { name: 'Qualificado', prob: '40%', rule: 'Problema e decisor confirmados' },
  { name: 'Demo agendada', prob: '60%', rule: 'Reunião de demonstração marcada' },
  { name: 'Proposta enviada', prob: '80%', rule: 'Proposta enviada, sem resposta' },
  { name: 'Negociação', prob: '90%', rule: 'Cliente ajustando valor e condições' },
  { name: 'Fechado ganho', prob: '100%', rule: 'Contrato assinado' },
  { name: 'Fechado perdido', prob: '0%', rule: 'Negócio encerrado sem fechamento' },
];

const deals = [
  { name: 'Vitrine Nova Store - Verificação de fotos de vendedores', vertical: 'E-commerce', value: 12000, prob: 20 },
  { name: 'Colégio Aurora Digital - Detecção em trabalhos visuais', vertical: 'Educação', value: 6000, prob: 40 },
  { name: 'Agência Pixel & Prosa - Checagem de banco de imagens', vertical: 'Agências de Marketing', value: 9600, prob: 60 },
  { name: 'Diário Horizonte - Verificação de imagens na redação', vertical: 'Jornalismo', value: 18000, prob: 80 },
  { name: 'Vitrine Nova Store - Moderação de fotos e avaliações', vertical: 'E-commerce', value: 24000, prob: 90 },
];

const brl = (n: number) => `R$ ${n.toLocaleString('pt-BR')}`;
const pct = (n: number) => `${n.toFixed(1).replace('.', ',')}%`;

const total = deals.reduce((sum, d) => sum + d.value, 0);
const weighted = deals.reduce((sum, d) => sum + Math.round((d.value * d.prob) / 100), 0);

const byVertical = Object.entries(
  deals.reduce<Record<string, number>>((acc, d) => {
    acc[d.vertical] = (acc[d.vertical] ?? 0) + d.value;
    return acc;
  }, {}),
)
  .map(([vertical, value]) => ({ vertical, value, share: (value / total) * 100 }))
  .sort((a, b) => b.value - a.value);

/* ------------------------------------------------------------------ */
/* TEXTOS                                                              */
/* ✏️  As seções DECISÕES e O QUE APRENDI estão em rascunho.          */
/*     Reescreva com as suas palavras ANTES de subir pro site.         */
/* ------------------------------------------------------------------ */

const verticals = [
  { name: 'Jornalismo', text: 'checar a autenticidade de fotos antes de publicar.' },
  { name: 'E-commerce', text: 'moderar fotos de produtos, de vendedores e avaliações com imagem.' },
  { name: 'Educação', text: 'detectar trabalhos visuais feitos com IA.' },
  { name: 'Agências de marketing', text: 'conferir bancos de imagens e dar transparência ao cliente.' },
];

const questions = [
  'De qual setor é cada lead?',
  'Como ele chegou até a Authentic?',
  'Em que etapa da venda ele está?',
  'Quanto dinheiro cada etapa representa, considerando a chance real de fechar?',
];

const properties = [
  { name: 'Vertical', type: 'Seleção de menu suspenso', options: 'Jornalismo, E-commerce, Educação, Agências de Marketing' },
  { name: 'Origem do lead', type: 'Seleção de menu suspenso', options: 'Site, Indicação, Linkedin, Evento' },
  { name: 'Caso de uso', type: 'Texto de linha única', options: 'Descrição curta do problema que o lead quer resolver' },
];

// ✏️ REESCREVER com as suas palavras
const decisions = [
  {
    title: 'Cada etapa tem um critério de entrada',
    text: 'Escrevi na própria descrição da etapa o que precisa ser verdade para um negócio entrar nela. Assim a etapa deixa de ser opinião e vira um fato que dá para verificar: o decisor foi identificado ou não foi.',
  },
  {
    title: 'Probabilidade crescente, de 20% a 90%',
    text: 'Com uma chance de fechamento por etapa, o HubSpot calcula o valor ponderado. Isso mostra a receita provável, e não só a soma bruta das oportunidades.',
  },
  {
    title: 'Listas fechadas em vez de texto livre',
    text: 'Vertical e Origem do lead são menus suspensos. Texto livre geraria variações como "e-commerce", "ecommerce" e "loja virtual", que impedem filtrar e montar relatórios depois.',
  },
  {
    title: 'Dois negócios na mesma empresa',
    text: 'A Vitrine Nova Store tem duas oportunidades, abertas por áreas diferentes (marketplace e segurança). Na prática uma empresa pode comprar por mais de uma porta, e o CRM precisa representar isso.',
  },
];

const limitations = [
  'Os dados são fictícios. Os números mostram como a estrutura funciona, não o desempenho de uma operação real.',
  'Não há automações. O plano gratuito do HubSpot limita fluxos de trabalho, então não implementei tarefas automáticas por etapa.',
  'Não há sequência de e-mails de nutrição nem integração com o GA4. Ficaram para a próxima etapa.',
];

// ✏️ REESCREVER com as suas palavras
const learnings = [
  {
    title: 'Conferir a moeda antes de cadastrar valores',
    text: 'A conta veio configurada em dólar. Troquei para real antes de criar os negócios, senão o quadro inteiro ia mostrar a moeda errada.',
  },
  {
    title: 'O HubSpot cria empresas sozinho a partir do domínio do e-mail',
    text: 'Como todos os contatos usavam example.com, ele criou uma empresa sem nome e ligou todo mundo a ela. Tive que corrigir as associações contato por contato.',
  },
  {
    title: 'Corrigir em um lugar atualiza todos os registros',
    text: 'Digitei o nome de uma empresa errado e os contatos apareceram ligados a ela com o nome errado. Ao corrigir o nome na empresa, os contatos e o negócio se atualizaram juntos, porque estavam associados a ela.',
  },
  {
    title: 'Dado inconsistente aparece rápido no quadro',
    text: 'Uma data digitada errada ou um nome fora do padrão aparece à primeira vista no quadro de negócios. Passei a revisar tudo antes de tirar os prints.',
  },
];

const nextSteps = [
  'Automação: criar tarefa automática quando um negócio chegar em "Demo agendada".',
  'Sequência de e-mails de nutrição por vertical.',
  'Integrar o GA4 para ligar o tráfego do site à origem do lead.',
  'Relatório de conversão por etapa e por vertical.',
];

/* ------------------------------------------------------------------ */
/* COMPONENTES DA PÁGINA                                               */
/* ------------------------------------------------------------------ */

function Section({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return (
    <section className="space-y-5 pt-14 mt-14 border-t border-zinc-800/80">
      <div className="space-y-1.5">
        <div className="text-emerald-400 text-xs font-semibold tracking-wider uppercase font-mono">{label}</div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Shot({
  file,
  alt,
  width,
  height,
  caption,
}: {
  file: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
}) {
  return (
    <figure className="space-y-2">
      <Image
        src={`${IMG}/${file}`}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 896px) 896px, 100vw"
        className="w-full h-auto rounded-xl border border-zinc-800/80"
      />
      <figcaption className="text-[11px] font-mono text-zinc-500">{caption}</figcaption>
    </figure>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return <p className="text-[15px] leading-7 text-zinc-300 max-w-3xl">{children}</p>;
}

function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800/80">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-950/70 text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-zinc-300">{children}</tbody>
      </table>
    </div>
  );
}

const tdClass = 'px-4 py-2.5 border-t border-zinc-800/60 align-top';

/* ------------------------------------------------------------------ */
/* PÁGINA                                                              */
/* ------------------------------------------------------------------ */

export default function AuthenticCrmCaseStudy() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <article className="mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-24">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- link com recarga completa para a âncora funcionar */}
        <a
          href="/#projetos"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>voltar aos projetos</span>
        </a>

        {/* Cabeçalho */}
        <header className="mt-10 space-y-5">
          <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Estudo de caso · CRM & Marketing Operations</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-100">
            Authentic CRM: estruturando o funil comercial de um SaaS no HubSpot
          </h1>
          <p className="text-zinc-400 text-base leading-7 max-w-3xl">
            Montei do zero a estrutura comercial da Authentic, um aplicativo que detecta imagens geradas por IA,
            tratando-o como um produto SaaS B2B. No HubSpot criei um pipeline de vendas de 5 etapas, três propriedades
            personalizadas para segmentar leads por vertical e uma base fictícia com 4 empresas, 9 contatos e 5 negócios.
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 px-4 py-3">
              <dt className="text-zinc-500">Tipo de projeto</dt>
              <dd className="mt-1 text-zinc-200">Simulação com dados fictícios</dd>
            </div>
            <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 px-4 py-3">
              <dt className="text-zinc-500">Ferramenta</dt>
              <dd className="mt-1 text-zinc-200">HubSpot (plano gratuito)</dd>
            </div>
            <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 px-4 py-3">
              <dt className="text-zinc-500">Foco</dt>
              <dd className="mt-1 text-zinc-200">Pipeline, segmentação e previsão de receita</dd>
            </div>
          </dl>
        </header>

        {/* Números */}
        <div className="mt-10 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4">
            <div className="text-lg sm:text-3xl font-bold font-mono text-emerald-400">{brl(total)}</div>
            <div className="mt-1 text-[11px] font-mono text-zinc-500">pipeline total</div>
          </div>
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4">
            <div className="text-lg sm:text-3xl font-bold font-mono text-emerald-400">{brl(weighted)}</div>
            <div className="mt-1 text-[11px] font-mono text-zinc-500">valor ponderado</div>
          </div>
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4">
            <div className="text-lg sm:text-3xl font-bold font-mono text-emerald-400">{deals.length}</div>
            <div className="mt-1 text-[11px] font-mono text-zinc-500">negócios simulados</div>
          </div>
        </div>

        <div className="mt-8">
          <Shot
            file="05-negocios-quadro.png"
            alt="Quadro de negócios do pipeline Authentic - Vendas B2B no HubSpot, com cinco negócios distribuídos de Lead novo a Negociação"
            width={1648}
            height={811}
            caption="Quadro de negócios no HubSpot: cinco oportunidades, uma em cada etapa aberta."
          />
        </div>

        {/* Contexto */}
        <Section label="Contexto" title="Um produto, quatro tipos de cliente">
          <Prose>
            A Authentic é um aplicativo em React, que eu mesmo desenvolvi, para identificar imagens criadas por IA (
            <a
              href="https://projeto-authentic.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-400/40"
            >
              ver a aplicação
            </a>
            ). Para este projeto, reposicionei o produto como uma solução B2B para quatro tipos de cliente:
          </Prose>
          <ul className="space-y-2 max-w-3xl">
            {verticals.map((v) => (
              <li key={v.name} className="text-[15px] leading-7 text-zinc-300">
                <span className="font-semibold text-zinc-100">{v.name}:</span> {v.text}
              </li>
            ))}
          </ul>
        </Section>

        {/* Problema e objetivo */}
        <Section label="Problema e objetivo" title="Sem processo comercial, não dá para priorizar nem prever">
          <Prose>
            Sem um processo, a Authentic teria quatro tipos de lead com necessidades diferentes e nenhum jeito de saber de
            onde cada um veio, em que ponto da conversa está ou quanto pode render. Isso impede priorizar o contato,
            repetir o que funciona e prever receita. O objetivo foi montar no HubSpot uma estrutura que responda a
            quatro perguntas:
          </Prose>
          <ol className="space-y-2 max-w-3xl list-decimal list-inside marker:text-emerald-400 marker:font-mono">
            {questions.map((q) => (
              <li key={q} className="text-[15px] leading-7 text-zinc-300">
                {q}
              </li>
            ))}
          </ol>
        </Section>

        {/* Solução */}
        <Section label="Solução" title="Propriedades, pipeline e uma base de dados para testar">
          <h3 className="text-lg font-semibold text-zinc-100">1. Propriedades personalizadas</h3>
          <Prose>
            Criei três propriedades no objeto Contato. Usei lista fechada em Vertical e Origem do lead para poder
            filtrar e montar relatórios sem variações de escrita.
          </Prose>
          <Table head={['Propriedade', 'Tipo', 'Opções / uso']}>
            {properties.map((p) => (
              <tr key={p.name}>
                <td className={`${tdClass} font-semibold text-zinc-100 whitespace-nowrap`}>{p.name}</td>
                <td className={`${tdClass} whitespace-nowrap`}>{p.type}</td>
                <td className={tdClass}>{p.options}</td>
              </tr>
            ))}
          </Table>
          <Shot
            file="02-propriedades-contatos.png"
            alt="Lista de propriedades de contato no HubSpot mostrando Vertical, Origem do lead e Caso de uso, criadas por Brenno Gabriel"
            width={1419}
            height={639}
            caption="As três propriedades criadas no objeto Contato."
          />

          <h3 className="text-lg font-semibold text-zinc-100 pt-4">2. Pipeline de vendas</h3>
          <Prose>
            O pipeline <span className="font-mono text-emerald-300">Authentic - Vendas B2B</span> tem 5 etapas abertas
            e as duas de fechamento. Cada etapa tem um critério de entrada e uma probabilidade de fechamento.
          </Prose>
          <Table head={['Etapa', 'Probabilidade', 'Critério de entrada']}>
            {stages.map((s) => (
              <tr key={s.name}>
                <td className={`${tdClass} font-semibold text-zinc-100 whitespace-nowrap`}>{s.name}</td>
                <td className={`${tdClass} font-mono whitespace-nowrap`}>{s.prob}</td>
                <td className={tdClass}>{s.rule}</td>
              </tr>
            ))}
          </Table>
          <Shot
            file="01-pipeline-configuracao.png"
            alt="Configuração do pipeline Authentic - Vendas B2B no HubSpot, com as sete fases, descrições, cores e probabilidades"
            width={1180}
            height={801}
            caption="Configuração do pipeline no HubSpot."
          />

          <h3 className="text-lg font-semibold text-zinc-100 pt-4">3. Base de dados fictícia</h3>
          <Prose>
            Para testar a estrutura, cadastrei 4 empresas (uma por vertical), 9 contatos com cargo, vertical, origem do
            lead, caso de uso e status, e 5 negócios com valor, data de fechamento prevista, prioridade e tipo de
            negócio, todos associados entre si.
          </Prose>
          <Shot
            file="04-lista-empresas.png"
            alt="Lista de empresas no HubSpot com Agência Pixel & Prosa, Colégio Aurora Digital, Vitrine Nova Store e Diário Horizonte"
            width={1589}
            height={811}
            caption="Empresas cadastradas, com cidade, setor e número de contatos associados."
          />
          <Shot
            file="03-lista-contatos.png"
            alt="Lista de nove contatos no HubSpot com colunas de vertical, status do lead, origem do lead e empresa principal"
            width={1648}
            height={761}
            caption="Contatos segmentados por vertical e origem do lead, ligados às empresas."
          />
          <Shot
            file="06-detalhe-negocio.png"
            alt="Detalhe do negócio Diário Horizonte - Verificação de imagens na redação, na etapa Proposta enviada, com contato e empresa associados"
            width={1648}
            height={838}
            caption="Um negócio aberto, com contato e empresa associados."
          />
        </Section>

        {/* Decisões */}
        <Section label="Decisões" title="Por que montei assim">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {decisions.map((d) => (
              <div key={d.title} className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 space-y-2">
                <h3 className="text-base font-semibold text-zinc-100">{d.title}</h3>
                <p className="text-sm leading-6 text-zinc-400">{d.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Resultado */}
        <Section label="Resultado da simulação" title="O que os números mostram">
          <Table head={['Indicador', 'Valor']}>
            <tr>
              <td className={tdClass}>Negócios abertos</td>
              <td className={`${tdClass} font-mono`}>{deals.length}</td>
            </tr>
            <tr>
              <td className={tdClass}>Valor total do pipeline</td>
              <td className={`${tdClass} font-mono`}>{brl(total)}</td>
            </tr>
            <tr>
              <td className={tdClass}>Valor ponderado pela probabilidade</td>
              <td className={`${tdClass} font-mono`}>{brl(weighted)}</td>
            </tr>
          </Table>

          <div className="space-y-3 max-w-3xl pt-2">
            <h3 className="text-sm font-mono text-zinc-400">Valor em aberto por vertical</h3>
            {byVertical.map((v) => (
              <div key={v.vertical} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-300">{v.vertical}</span>
                  <span className="text-zinc-500">
                    {brl(v.value)} · {pct(v.share)}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-zinc-800/80 overflow-hidden">
                  <div className="h-full rounded-full bg-emerald-400" style={{ width: `${v.share}%` }} />
                </div>
              </div>
            ))}
          </div>

          <Prose>
            Os dois negócios mais avançados (Proposta enviada e Negociação) respondem por R$ 36.000 dos {brl(weighted)} do
            valor ponderado. É o dinheiro que mereceria mais atenção de um time comercial. Entre os 9 contatos, a origem
            do lead se divide em 3 por indicação, 2 pelo site, 2 pelo LinkedIn e 2 por eventos.
          </Prose>
        </Section>

        {/* Limitações */}
        <Section label="Limitações" title="O que este projeto é e o que não é">
          <ul className="space-y-2 max-w-3xl list-disc list-inside marker:text-emerald-400">
            {limitations.map((l) => (
              <li key={l} className="text-[15px] leading-7 text-zinc-300">
                {l}
              </li>
            ))}
          </ul>
        </Section>

        {/* Aprendizados */}
        <Section label="O que aprendi" title="Problemas reais que apareceram na montagem">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {learnings.map((l) => (
              <div key={l.title} className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 space-y-2">
                <h3 className="text-base font-semibold text-zinc-100">{l.title}</h3>
                <p className="text-sm leading-6 text-zinc-400">{l.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Próximos passos */}
        <Section label="Próximos passos" title="O que vem depois">
          <ol className="space-y-2 max-w-3xl list-decimal list-inside marker:text-emerald-400 marker:font-mono">
            {nextSteps.map((s) => (
              <li key={s} className="text-[15px] leading-7 text-zinc-300">
                {s}
              </li>
            ))}
          </ol>
        </Section>

        {/* Rodapé */}
        <footer className="mt-16 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- link com recarga completa para a âncora funcionar */}
          <a
            href="/#projetos"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>voltar aos projetos</span>
          </a>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- link com recarga completa para a âncora funcionar */}
          <a
            href="/#contato"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-semibold font-mono transition-all active:scale-95 self-start sm:self-auto"
          >
            <span>Vamos conversar</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </footer>
      </article>
    </main>
  );
}
