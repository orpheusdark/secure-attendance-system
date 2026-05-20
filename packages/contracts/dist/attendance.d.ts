import { z } from 'zod';
export declare const attendanceStatusSchema: z.ZodEnum<["present", "late", "suspicious", "rejected", "manual_review"]>;
export type AttendanceStatus = z.infer<typeof attendanceStatusSchema>;
export declare const scanPayloadSchema: z.ZodObject<{
    sessionId: z.ZodString;
    token: z.ZodString;
    deviceId: z.ZodString;
    location: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
        accuracy: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        latitude: number;
        longitude: number;
        accuracy: number;
    }, {
        latitude: number;
        longitude: number;
        accuracy: number;
    }>;
    timestamp: z.ZodString;
    networkType: z.ZodString;
    bluetoothStrength: z.ZodOptional<z.ZodNumber>;
    motionScore: z.ZodOptional<z.ZodNumber>;
    selfieConfidence: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    token: string;
    deviceId: string;
    location: {
        latitude: number;
        longitude: number;
        accuracy: number;
    };
    timestamp: string;
    networkType: string;
    bluetoothStrength?: number | undefined;
    motionScore?: number | undefined;
    selfieConfidence?: number | undefined;
}, {
    sessionId: string;
    token: string;
    deviceId: string;
    location: {
        latitude: number;
        longitude: number;
        accuracy: number;
    };
    timestamp: string;
    networkType: string;
    bluetoothStrength?: number | undefined;
    motionScore?: number | undefined;
    selfieConfidence?: number | undefined;
}>;
export type ScanPayload = z.infer<typeof scanPayloadSchema>;
