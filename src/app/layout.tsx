import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://brenno.dev'),
  title: {
    default: 'Brenno Gabriel | Design Engineer & Growth Systems',
    template: '%s | Brenno Gabriel',
  },
  description:
    'Desenvolvimento front-end moderno integrado a estratégias de Inbound Marketing, arquitetura limpa e produtos digitais orientados a resultado.',
  keywords: [
    'Design Engineer',
    'Front-end Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Inbound Marketing',
    'HubSpot',
    'UI Engineering',
  ],
  authors: [{ name: 'Brenno Gabriel' }],
  creator: 'Brenno Gabriel',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://brenno.dev',
    title: 'Brenno Gabriel | Design Engineer & Growth Systems',
    description:
      'Interfaces táteis, performance crítica e arquitetura front-end focada em conversão e dados.',
    siteName: 'Brenno Gabriel Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brenno Gabriel | Design Engineer',
    description:
      'Desenvolvimento front-end integrado a fundamentos de Inbound Marketing.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-emerald-500/25 selection:text-emerald-200">
        {children}
      </body>
    </html>
  );
}