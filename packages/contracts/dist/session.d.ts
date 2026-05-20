import { z } from 'zod';
export declare const verificationModeSchema: z.ZodEnum<["qr", "qr_plus_location", "qr_plus_face", "qr_plus_ble", "offline_signed"]>;
export type VerificationMode = z.infer<typeof verificationModeSchema>;
export declare const attendanceSessionSchema: z.ZodObject<{
    id: z.ZodString;
    institutionId: z.ZodString;
    subjectId: z.ZodString;
    classroomId: z.ZodString;
    teacherId: z.ZodString;
    startsAt: z.ZodString;
    endsAt: z.ZodString;
    radiusMeters: z.ZodNumber;
    verificationMode: z.ZodEnum<["qr", "qr_plus_location", "qr_plus_face", "qr_plus_ble", "offline_signed"]>;
    isLocked: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    institutionId: string;
    subjectId: string;
    classroomId: string;
    teacherId: string;
    startsAt: string;
    endsAt: string;
    radiusMeters: number;
    verificationMode: "qr" | "qr_plus_location" | "qr_plus_face" | "qr_plus_ble" | "offline_signed";
    isLocked: boolean;
}, {
    id: string;
    institutionId: string;
    subjectId: string;
    classroomId: string;
    teacherId: string;
    startsAt: string;
    endsAt: string;
    radiusMeters: number;
    verificationMode: "qr" | "qr_plus_location" | "qr_plus_face" | "qr_plus_ble" | "offline_signed";
    isLocked?: boolean | undefined;
}>;
export type AttendanceSession = z.infer<typeof attendanceSessionSchema>;
