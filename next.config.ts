import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Remove a assinatura 'X-Powered-By: Next.js' para ocultar a stack de scanners
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Impede que seu portfólio seja incorporado em iframes maliciosos (anti-clickjacking)
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Força o navegador a respeitar os tipos MIME declarados
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()', // Bloqueia permissões de hardware desnecessárias
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },
};

export default nextConfig;