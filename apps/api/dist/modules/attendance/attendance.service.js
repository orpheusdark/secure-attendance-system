"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const contracts_1 = require("@secure-attendance/contracts");
const security_1 = require("@secure-attendance/security");
const prisma_service_1 = require("../../prisma/prisma.service");
let AttendanceService = class AttendanceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSession(body) {
        const parsed = contracts_1.attendanceSessionSchema.parse({
            id: (0, node_crypto_1.randomUUID)(),
            institutionId: String(body['institutionId'] ?? 'institution-default'),
            subjectId: String(body['subjectId'] ?? 'subject-default'),
            classroomId: String(body['classroomId'] ?? 'classroom-default'),
            teacherId: String(body['teacherId'] ?? 'teacher-default'),
            startsAt: String(body['startsAt'] ?? new Date().toISOString()),
            endsAt: String(body['endsAt'] ?? new Date(Date.now() + 60 * 60 * 1000).toISOString()),
            radiusMeters: Number(body['radiusMeters'] ?? 150),
            verificationMode: body['verificationMode'] ?? 'qr_plus_location',
            isLocked: false,
        });
        const classroom = await this.prisma.classroom.upsert({
            where: { id: parsed.classroomId },
            update: {
                institutionId: parsed.institutionId,
                name: String(body['classroomName'] ?? 'Session Classroom'),
                building: String(body['building'] ?? 'Main Building'),
                latitude: Number(body['latitude'] ?? 0),
                longitude: Number(body['longitude'] ?? 0),
                accuracyMeters: Number(body['accuracyMeters'] ?? 25),
            },
            create: {
                id: parsed.classroomId,
                institutionId: parsed.institutionId,
                name: String(body['classroomName'] ?? 'Session Classroom'),
                building: String(body['building'] ?? 'Main Building'),
                floor: body['floor'] ? String(body['floor']) : null,
                latitude: Number(body['latitude'] ?? 0),
                longitude: Number(body['longitude'] ?? 0),
                accuracyMeters: Number(body['accuracyMeters'] ?? 25),
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
        const record = {
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
            rollingSecret: process.env['SESSION_TOKEN_SECRET'] ?? 'session-secret',
            createdAt: new Date().toISOString(),
            qrRefreshSeconds: 12,
            classroomLocation: {
                latitude: session.classroom.latitude,
                longitude: session.classroom.longitude,
            },
        };
        const qrToken = (0, security_1.createRollingAttendanceToken)({
            sessionId: record.id,
            secret: record.rollingSecret,
            ttlSeconds: record.qrRefreshSeconds,
        });
        await this.prisma.qrToken.create({
            data: {
                sessionId: record.id,
                tokenHash: (0, security_1.sha256Hex)(qrToken),
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
    async validateScan(body) {
        const scan = contracts_1.scanPayloadSchema.parse(body);
        const session = await this.prisma.attendanceSession.findUnique({
            where: { id: scan.sessionId },
            include: { classroom: true, qrTokens: true },
        });
        if (!session) {
            throw new common_1.NotFoundException('Session not found');
        }
        const matchingToken = session.qrTokens.find((token) => token.tokenHash === (0, security_1.sha256Hex)(scan.token) && token.revokedAt === null && token.consumedAt === null);
        const token = (0, security_1.validateRollingAttendanceToken)(scan.token, process.env['SESSION_TOKEN_SECRET'] ?? 'session-secret');
        const freshnessSeconds = token ? Math.max(0, Math.floor((Date.now() - token.issuedAt) / 1000)) : Number.POSITIVE_INFINITY;
        const assessment = (0, security_1.assessFraud)({
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
        const record = {
            id: (0, node_crypto_1.randomUUID)(),
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
    async lockSession(sessionId) {
        const session = await this.prisma.attendanceSession.findUnique({ where: { id: sessionId } });
        if (!session) {
            throw new common_1.NotFoundException('Session not found');
        }
        await this.prisma.attendanceSession.update({ where: { id: sessionId }, data: { isLocked: true } });
        await this.prisma.sessionEvent.create({ data: { sessionId, type: 'locked', payload: {} } });
        return { sessionId, isLocked: true };
    }
    async getSession(sessionId) {
        const session = await this.prisma.attendanceSession.findUnique({
            where: { id: sessionId },
            include: { classroom: true, subject: true, records: true },
        });
        if (!session) {
            throw new common_1.NotFoundException('Session not found');
        }
        return session;
    }
    async getLatestSession(teacherId) {
        return this.prisma.attendanceSession.findFirst({
            where: teacherId ? { teacherId } : undefined,
            orderBy: { createdAt: 'desc' },
            include: { classroom: true, subject: true, records: true },
        });
    }
    async listRecords(sessionId) {
        return this.prisma.attendanceRecord.findMany({
            where: sessionId ? { sessionId } : undefined,
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AttendanceService);
