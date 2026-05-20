"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileSchema = exports.deviceTrustSchema = exports.userRoleSchema = void 0;
const zod_1 = require("zod");
exports.userRoleSchema = zod_1.z.enum(['student', 'teacher', 'admin', 'super_admin']);
exports.deviceTrustSchema = zod_1.z.enum(['trusted', 'new', 'suspicious', 'blocked']);
exports.userProfileSchema = zod_1.z.object({
    id: zod_1.z.string(),
    institutionId: zod_1.z.string().nullable(),
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string().optional(),
    role: exports.userRoleSchema,
    deviceTrust: exports.deviceTrustSchema.default('new'),
});
