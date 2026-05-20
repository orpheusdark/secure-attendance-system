"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationSchema = exports.isoDateSchema = exports.idSchema = void 0;
const zod_1 = require("zod");
exports.idSchema = zod_1.z.string().min(1);
exports.isoDateSchema = zod_1.z.string().datetime();
exports.paginationSchema = zod_1.z.object({
    page: zod_1.z.number().int().min(1).default(1),
    limit: zod_1.z.number().int().min(1).max(100).default(20),
});
