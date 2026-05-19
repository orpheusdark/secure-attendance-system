import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

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
}
