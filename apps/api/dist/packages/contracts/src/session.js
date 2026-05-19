import { z } from 'zod';
export const verificationModeSchema = z.enum(['qr', 'qr_plus_location', 'qr_plus_face', 'qr_plus_ble', 'offline_signed']);
export const attendanceSessionSchema = z.object({
    id: z.string(),
    institutionId: z.string(),
    subjectId: z.string(),
    classroomId: z.string(),
    teacherId: z.string(),
    startsAt: z.string().datetime(),
    endsAt: z.string().datetime(),
    radiusMeters: z.number().int().positive(),
    verificationMode: verificationModeSchema,
    isLocked: z.boolean().default(false),
});
