import { z } from 'zod';

export const institutionSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  code: z.string().min(2),
  timezone: z.string().default('UTC'),
  geofenceRadiusMeters: z.number().int().positive().default(150),
  isActive: z.boolean().default(true),
});

export type Institution = z.infer<typeof institutionSchema>;
