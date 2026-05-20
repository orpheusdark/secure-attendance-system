"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanPayloadSchema = exports.attendanceStatusSchema = void 0;
const zod_1 = require("zod");
exports.attendanceStatusSchema = zod_1.z.enum(['present', 'late', 'suspicious', 'rejected', 'manual_review']);
exports.scanPayloadSchema = zod_1.z.object({
    sessionId: zod_1.z.string(),
    token: zod_1.z.string(),
    deviceId: zod_1.z.string(),
    location: zod_1.z.object({
        latitude: zod_1.z.number(),
        longitude: zod_1.z.number(),
        accuracy: zod_1.z.number(),
    }),
    timestamp: zod_1.z.string().datetime(),
    networkType: zod_1.z.string(),
    bluetoothStrength: zod_1.z.number().optional(),
    motionScore: zod_1.z.number().min(0).max(1).optional(),
    selfieConfidence: zod_1.z.number().min(0).max(1).optional(),
});
