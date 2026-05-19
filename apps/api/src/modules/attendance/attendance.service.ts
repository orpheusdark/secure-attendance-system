import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import {
  attendanceSessionSchema,
  scanPayloadSchema,
  type AttendanceSession,
  type AttendanceStatus,
} from '@secure-attendance/contracts';
import { assessFraud, createRollingAttendanceToken, sha256Hex, validateRollingAttendanceToken } from '@secure-attendance/security';
import { PrismaService } from '../../prisma/prisma.service';

export type AttendanceSessionRecord = AttendanceSession & {
  rollingSecret: string;
  createdAt: string;
  qrRefreshSeconds: number;
  classroomLocation: {
    latitude: number;
    longitude: number;
  };
};

export type AttendanceRecord = {
  id: string;
  sessionId: string;
  studentId?: string;
  status: AttendanceStatus;
  fraudScore: number;
  reasons: string[];
  createdAt: string;
};

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  async createSession(body: Record<string, unknown>) {
    const parsed = attendanceSessionSchema.parse({
      id: randomUUID(),
      institutionId: String(body.institutionId ?? 'institution-default'),
      subjectId: String(body.subjectId ?? 'subject-default'),
      classroomId: String(body.classroomId ?? 'classroom-default'),
      teacherId: String(body.teacherId ?? 'teacher-default'),
      startsAt: String(body.startsAt ?? new Date().toISOString()),
      endsAt: String(body.endsAt ?? new Date(Date.now() + 60 * 60 * 1000).toISOString()),
      radiusMeters: Number(body.radiusMeters ?? 150),
      verificationMode: body.verificationMode ?? 'qr_plus_location',
      isLocked: false,
    });

    const classroom = await this.prisma.classroom.upsert({
      where: { id: parsed.classroomId },
      update: {
        institutionId: parsed.institutionId,
        name: String(body.classroomName ?? 'Session Classroom'),
        building: String(body.building ?? 'Main Building'),
        latitude: Number(body.latitude ?? 0),
        longitude: Number(body.longitude ?? 0),
        accuracyMeters: Number(body.accuracyMeters ?? 25),
      },
      create: {
        id: parsed.classroomId,
        institutionId: parsed.institutionId,
        name: String(body.classroomName ?? 'Session Classroom'),
        building: String(body.building ?? 'Main Building'),
        floor: body.floor ? String(body.floor) : null,
        latitude: Number(body.latitude ?? 0),
        longitude: Number(body.longitude ?? 0),
        accuracyMeters: Number(body.accuracyMeters ?? 25),
      },
    });

    const session = await this.prisma.attendanceSession.create({
      data: {
        ...parsed,
        classroomId: classroom.id,
        startsAt: new Date(parsed.startsAt),
        endsAt: new Date(parsed.endsAt),
      },
      include: { classroom: true },
    });

    const record: AttendanceSessionRecord = {
      id: session.id,
      institutionId: session.institutionId,
      subjectId: session.subjectId,
      classroomId: session.classroomId,
      teacherId: session.teacherId,
      startsAt: session.startsAt.toISOString(),
      endsAt: session.endsAt.toISOString(),
      radiusMeters: session.radiusMeters,
      verificationMode: session.verificationMode,
      isLocked: session.isLocked,
      rollingSecret: process.env.SESSION_TOKEN_SECRET ?? 'session-secret',
      createdAt: new Date().toISOString(),
      qrRefreshSeconds: 12,
      classroomLocation: {
        latitude: session.classroom.latitude,
        longitude: session.classroom.longitude,
      },
    };

    const qrToken = createRollingAttendanceToken({
      sessionId: record.id,
      secret: record.rollingSecret,
      ttlSeconds: record.qrRefreshSeconds,
    });

    await this.prisma.qrToken.create({
      data: {
        sessionId: record.id,
        tokenHash: sha256Hex(qrToken),
        nonce: 'rolling',
        expiresAt: new Date(Date.now() + record.qrRefreshSeconds * 1000),
      },
    });

    await this.prisma.sessionEvent.create({
      data: {
        sessionId: record.id,
        type: 'created',
        payload: { qrRefreshSeconds: record.qrRefreshSeconds },
      },
    });

    return { session: record, qrToken };
  }

  async validateScan(body: Record<string, unknown>) {
    const scan = scanPayloadSchema.parse(body);
    const session = await this.prisma.attendanceSession.findUnique({
      where: { id: scan.sessionId },
      include: { classroom: true, qrTokens: true },
    });
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    const matchingToken = session.qrTokens.find(
      (token: { id: string; tokenHash: string; revokedAt: Date | null; consumedAt: Date | null }) =>
        token.tokenHash === sha256Hex(scan.token) && token.revokedAt === null && token.consumedAt === null,
    );
    const token = validateRollingAttendanceToken(scan.token, process.env.SESSION_TOKEN_SECRET ?? 'session-secret');
    const freshnessSeconds = token ? Math.max(0, Math.floor((Date.now() - token.issuedAt) / 1000)) : Number.POSITIVE_INFINITY;
    const assessment = assessFraud({
      expectedLocation: { latitude: session.classroom.latitude, longitude: session.classroom.longitude },
      actualLocation: scan.location,
      distanceThresholdMeters: session.radiusMeters,
      accuracyMeters: scan.location.accuracy,
      deviceTrustScore: 0.82,
      motionScore: scan.motionScore,
      selfieConfidence: scan.selfieConfidence,
      recentReplayAttempts: token ? 0 : 1,
      simultaneousDeviceCount: 1,
      qrFreshnessSeconds: freshnessSeconds,
      gpsSpoofIndicators: 0,
    });

    const record: AttendanceRecord = {
      id: randomUUID(),
      sessionId: session.id,
      status: assessment.status,
      fraudScore: assessment.fraudScore,
      reasons: assessment.reasons,
      createdAt: new Date().toISOString(),
    };

    await this.prisma.attendanceRecord.create({
      data: {
        sessionId: session.id,
        status: assessment.status,
        fraudScore: assessment.fraudScore,
        reasons: assessment.reasons,
        deviceId: scan.deviceId,
        accuracyMeters: scan.location.accuracy,
        selfieConfidence: scan.selfieConfidence,
        motionScore: scan.motionScore,
        distanceMeters: 0,
      },
    });

    if (matchingToken) {
      await this.prisma.qrToken.update({
        where: { id: matchingToken.id },
        data: { consumedAt: new Date() },
      });
    }

    await this.prisma.sessionEvent.create({
      data: {
        sessionId: session.id,
        type: 'validated',
        payload: { status: assessment.status, fraudScore: assessment.fraudScore },
      },
    });

    return record;
  }

  async lockSession(sessionId: string) {
    const session = await this.prisma.attendanceSession.findUnique({ where: { id: sessionId } });
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    await this.prisma.attendanceSession.update({ where: { id: sessionId }, data: { isLocked: true } });
    await this.prisma.sessionEvent.create({ data: { sessionId, type: 'locked', payload: {} } });
    return { sessionId, isLocked: true };
  }

  async getSession(sessionId: string) {
    const session = await this.prisma.attendanceSession.findUnique({
      where: { id: sessionId },
      include: { classroom: true, subject: true, records: true },
    });
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }

  async getLatestSession(teacherId?: string) {
    return this.prisma.attendanceSession.findFirst({
      where: teacherId ? { teacherId } : undefined,
      orderBy: { createdAt: 'desc' },
      include: { classroom: true, subject: true, records: true },
    });
  }

  async listRecords(sessionId?: string) {
    return this.prisma.attendanceRecord.findMany({
      where: sessionId ? { sessionId } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }
}
