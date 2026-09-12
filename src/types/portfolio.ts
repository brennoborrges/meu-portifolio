import { z } from 'zod';

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  category: z.enum(['frontend', 'marketing', 'fullstack']),
  demoUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
  featured: z.boolean().default(false),
});

export const CertificationSchema = z.object({
  id: z.string(),
  title: z.string(),
  issuer: z.string(),
  issueDate: z.string(),
  credentialUrl: z.string().url(),
  skills: z.array(z.string()),
  featured: z.boolean().default(false),
});

export type Project = z.infer<typeof ProjectSchema>;
export type Certification = z.infer<typeof CertificationSchema>;