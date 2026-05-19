import { z } from 'zod';

export const idSchema = z.string().min(1);
export const isoDateSchema = z.string().datetime();
export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
