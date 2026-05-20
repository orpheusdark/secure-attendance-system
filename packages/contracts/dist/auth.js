"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSessionSchema = exports.loginMethodSchema = void 0;
const zod_1 = require("zod");
exports.loginMethodSchema = zod_1.z.enum(['password', 'otp', 'google', 'sso', 'biometric']);
exports.authSessionSchema = zod_1.z.object({
    accessToken: zod_1.z.string(),
    refreshToken: zod_1.z.string(),
    deviceId: zod_1.z.string(),
    expiresAt: zod_1.z.string().datetime(),
    role: zod_1.z.enum(['student', 'teacher', 'admin', 'super_admin']),
});
