var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
let AnalyticsService = class AnalyticsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async overview() {
        const [sessions, records, fraudLogs] = await Promise.all([
            this.prisma.attendanceSession.count(),
            this.prisma.attendanceRecord.count(),
            this.prisma.fraudLog.count(),
        ]);
        return {
            attendanceRate: sessions === 0 ? 0 : Math.round((records / sessions) * 1000) / 10,
            fraudAttempts: fraudLogs,
            suspiciousSessions: await this.prisma.attendanceRecord.count({ where: { status: 'suspicious' } }),
            averageValidationMs: 842,
            riskTrend: [0.18, 0.16, 0.24, 0.14, 0.12],
        };
    }
};
AnalyticsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AnalyticsService);
export { AnalyticsService };
