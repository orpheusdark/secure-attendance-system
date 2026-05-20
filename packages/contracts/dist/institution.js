"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.institutionSchema = void 0;
const zod_1 = require("zod");
exports.institutionSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().min(1),
    code: zod_1.z.string().min(2),
    timezone: zod_1.z.string().default('UTC'),
    geofenceRadiusMeters: zod_1.z.number().int().positive().default(150),
    isActive: zod_1.z.boolean().default(true),
});
