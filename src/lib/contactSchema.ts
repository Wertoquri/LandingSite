import { z } from 'zod';

export const contactSchema = z.object({
  projectType: z.string().min(2).max(80),
  budget: z.string().min(2).max(80),
  deadline: z.string().min(2).max(80),
  contactMethod: z.enum(['Email', 'Telegram']),
  name: z.string().trim().min(2).max(80),
  email: z.string().email().max(160),
  brief: z.string().trim().min(20).max(3000),
  company: z.string().max(0).optional().default(''),
});

export type ContactPayload = z.infer<typeof contactSchema>;
