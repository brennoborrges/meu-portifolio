import { Certification, Project } from '@/types/portfolio';

export const certificationsData: Certification[] = [
  {
    id: 'hubspot-inbound-marketing',
    title: 'Inbound Marketing Certified',
    issuer: 'HubSpot Academy',
    issueDate: '2026',
    credentialUrl: 'https://academy.hubspot.com/',
    skills: ['Inbound Marketing', 'Buyer Personas', 'Nutrição de Leads', 'Automação'],
    featured: true,
  },
  {
    id: 'hubspot-inbound',
    title: 'Inbound Certified',
    issuer: 'HubSpot Academy',
    issueDate: '2026',
    credentialUrl: 'https://academy.hubspot.com/',
    skills: ['Flywheel', 'Atribuição', 'Jornada do Comprador', 'Web Analytics'],
    featured: true,
  },
];

export const projectsData: Project[] = [
  {
    id: 'portfolio-plataforma',
    title: 'Engenharia de Portfólio Full-Stack',
    summary: 'Arquitetura moderna desenvolvida com Next.js, React e TypeScript.',
    description: 'Interface responsiva orientada a Core Web Vitals, tipagem segura de ponta a ponta e apresentação unificada de desenvolvimento de software e estratégias de marketing.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    category: 'fullstack',
    featured: true,
  },
];