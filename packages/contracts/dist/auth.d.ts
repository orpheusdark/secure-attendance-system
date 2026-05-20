import { z } from 'zod';
export declare const loginMethodSchema: z.ZodEnum<["password", "otp", "google", "sso", "biometric"]>;
export type LoginMethod = z.infer<typeof loginMethodSchema>;
export declare const authSessionSchema: z.ZodObject<{
    accessToken: z.ZodString;
    refreshToken: z.ZodString;
    deviceId: z.ZodString;
    expiresAt: z.ZodString;
    role: z.ZodEnum<["student", "teacher", "admin", "super_admin"]>;
}, "strip", z.ZodTypeAny, {
    deviceId: string;
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
    role: "student" | "teacher" | "admin" | "super_admin";
}, {
    deviceId: string;
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
    role: "student" | "teacher" | "admin" | "super_admin";
}>;
export type AuthSession = z.infer<typeof authSessionSchema>;
