import { z } from 'zod';
export const loginMethodSchema = z.enum(['password', 'otp', 'google', 'sso', 'biometric']);
export const authSessionSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    deviceId: z.string(),
    expiresAt: z.string().datetime(),
    role: z.enum(['student', 'teacher', 'admin', 'super_admin']),
});
