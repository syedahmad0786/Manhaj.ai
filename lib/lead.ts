import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().email('Valid email required'),
  company: z.string().optional().or(z.literal('')),
  role: z.string().optional().or(z.literal('')),
  revenue: z
    .enum(['<1m', '1-3m', '3-10m', '10m+', 'na'])
    .optional()
    .or(z.literal('')),
  stack: z.string().optional().or(z.literal('')),
  when: z
    .enum(['now', '30d', '60d', 'browsing'])
    .optional()
    .or(z.literal('')),
  notes: z.string().max(2000).optional().or(z.literal('')),
});

export type Lead = z.infer<typeof leadSchema>;
