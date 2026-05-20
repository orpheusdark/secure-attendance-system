"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendanceSessionSchema = exports.verificationModeSchema = void 0;
const zod_1 = require("zod");
exports.verificationModeSchema = zod_1.z.enum(['qr', 'qr_plus_location', 'qr_plus_face', 'qr_plus_ble', 'offline_signed']);
exports.attendanceSessionSchema = zod_1.z.object({
    id: zod_1.z.string(),
    institutionId: zod_1.z.string(),
    subjectId: zod_1.z.string(),
    classroomId: zod_1.z.string(),
    teacherId: zod_1.z.string(),
    startsAt: zod_1.z.string().datetime(),
    endsAt: zod_1.z.string().datetime(),
    radiusMeters: zod_1.z.number().int().positive(),
    verificationMode: exports.verificationModeSchema,
    isLocked: zod_1.z.boolean().default(false),
});
