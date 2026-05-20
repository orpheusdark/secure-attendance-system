import { z } from 'zod';
export declare const userRoleSchema: z.ZodEnum<["student", "teacher", "admin", "super_admin"]>;
export type UserRole = z.infer<typeof userRoleSchema>;
export declare const deviceTrustSchema: z.ZodEnum<["trusted", "new", "suspicious", "blocked"]>;
export type DeviceTrust = z.infer<typeof deviceTrustSchema>;
export declare const userProfileSchema: z.ZodObject<{
    id: z.ZodString;
    institutionId: z.ZodNullable<z.ZodString>;
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    role: z.ZodEnum<["student", "teacher", "admin", "super_admin"]>;
    deviceTrust: z.ZodDefault<z.ZodEnum<["trusted", "new", "suspicious", "blocked"]>>;
}, "strip", z.ZodTypeAny, {
    role: "student" | "teacher" | "admin" | "super_admin";
    id: string;
    name: string;
    institutionId: string | null;
    email: string;
    deviceTrust: "suspicious" | "trusted" | "new" | "blocked";
    phone?: string | undefined;
}, {
    role: "student" | "teacher" | "admin" | "super_admin";
    id: string;
    name: string;
    institutionId: string | null;
    email: string;
    phone?: string | undefined;
    deviceTrust?: "suspicious" | "trusted" | "new" | "blocked" | undefined;
}>;
export type UserProfile = z.infer<typeof userProfileSchema>;
