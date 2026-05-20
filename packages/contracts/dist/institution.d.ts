import { z } from 'zod';
export declare const institutionSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    code: z.ZodString;
    timezone: z.ZodDefault<z.ZodString>;
    geofenceRadiusMeters: z.ZodDefault<z.ZodNumber>;
    isActive: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    code: string;
    id: string;
    name: string;
    timezone: string;
    geofenceRadiusMeters: number;
    isActive: boolean;
}, {
    code: string;
    id: string;
    name: string;
    timezone?: string | undefined;
    geofenceRadiusMeters?: number | undefined;
    isActive?: boolean | undefined;
}>;
export type Institution = z.infer<typeof institutionSchema>;
