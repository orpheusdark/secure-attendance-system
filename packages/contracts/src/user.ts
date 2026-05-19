import { z } from 'zod';

export const userRoleSchema = z.enum(['student', 'teacher', 'admin', 'super_admin']);
export type UserRole = z.infer<typeof userRoleSchema>;

export const deviceTrustSchema = z.enum(['trusted', 'new', 'suspicious', 'blocked']);
export type DeviceTrust = z.infer<typeof deviceTrustSchema>;

export const userProfileSchema = z.object({
  id: z.string(),
  institutionId: z.string().nullable(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  role: userRoleSchema,
  deviceTrust: deviceTrustSchema.default('new'),
});

export type UserProfile = z.infer<typeof userProfileSchema>;
