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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcryptjs_1 = require("bcryptjs");
const security_1 = require("@secure-attendance/security");
const prisma_service_1 = require("../../prisma/prisma.service");
let AuthService = class AuthService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    hashToken(token) {
        return (0, security_1.sha256Hex)(token);
    }
    async login(input) {
        if (!input.email || !input.deviceId) {
            throw new common_1.UnauthorizedException('Missing credentials');
        }
        const userRecord = await this.prisma.user.findUnique({ where: { email: input.email } });
        if (!userRecord) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (userRecord.passwordHash) {
            const passwordValid = await (0, bcryptjs_1.compare)(input.password ?? '', userRecord.passwordHash);
            if (!passwordValid) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
        }
        const user = {
            id: userRecord.id,
            institutionId: userRecord.institutionId,
            name: userRecord.name,
            email: userRecord.email,
            phone: userRecord.phone ?? undefined,
            role: userRecord.role,
            deviceTrust: userRecord.deviceTrust,
        };
        const accessToken = (0, security_1.createRollingAttendanceToken)({
            sessionId: user.id,
            secret: process.env['TOKEN_SECRET'] ?? 'dev-secret',
            ttlSeconds: 900,
            deviceId: input.deviceId,
        });
        const refreshToken = (0, security_1.createRollingAttendanceToken)({
            sessionId: user.id,
            secret: process.env['REFRESH_SECRET'] ?? 'refresh-secret',
            ttlSeconds: 60 * 60 * 24 * 30,
            deviceId: input.deviceId,
        });
        await this.prisma.authSession.create({
            data: {
                userId: user.id,
                deviceId: input.deviceId,
                accessTokenHash: this.hashToken(accessToken),
                refreshTokenHash: this.hashToken(refreshToken),
                expiresAt: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
            },
        });
        await this.prisma.deviceRegistry.upsert({
            where: {
                userId_deviceId: {
                    userId: user.id,
                    deviceId: input.deviceId,
                },
            },
            update: {
                trustScore: 0.92,
                lastSeenAt: new Date(),
            },
            create: {
                userId: user.id,
                deviceId: input.deviceId,
                deviceName: 'Registered Device',
                platform: 'unknown',
                trustScore: 0.92,
                lastSeenAt: new Date(),
            },
        });
        await this.prisma.auditLog.create({
            data: {
                userId: user.id,
                institutionId: user.institutionId,
                action: 'auth.login',
                entity: 'auth_session',
                entityId: user.id,
                metadata: { method: input.method, deviceId: input.deviceId },
            },
        });
        return { accessToken, refreshToken, user };
    }
    async refreshSession(refreshToken, deviceId) {
        const refreshTokenHash = this.hashToken(refreshToken);
        const session = await this.prisma.authSession.findUnique({ where: { refreshTokenHash }, include: { user: true } });
        if (!session || session.deviceId !== deviceId || session.revokedAt || session.expiresAt < new Date()) {
            throw new common_1.UnauthorizedException('Invalid session');
        }
        await this.prisma.authSession.update({
            where: { id: session.id },
            data: { revokedAt: new Date() },
        });
        const accessToken = (0, security_1.createRollingAttendanceToken)({
            sessionId: session.user.id,
            secret: process.env['TOKEN_SECRET'] ?? 'dev-secret',
            ttlSeconds: 900,
            deviceId,
        });
        const nextRefreshToken = (0, security_1.createRollingAttendanceToken)({
            sessionId: session.user.id,
            secret: process.env['REFRESH_SECRET'] ?? 'refresh-secret',
            ttlSeconds: 60 * 60 * 24 * 30,
            deviceId,
        });
        await this.prisma.authSession.create({
            data: {
                userId: session.userId,
                deviceId,
                accessTokenHash: this.hashToken(accessToken),
                refreshTokenHash: this.hashToken(nextRefreshToken),
                expiresAt: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
            },
        });
        return { accessToken, refreshToken: nextRefreshToken, user: session.user };
    }
    async logoutAllDevices(userId) {
        await this.prisma.authSession.updateMany({
            where: { userId, revokedAt: null },
            data: { revokedAt: new Date() },
        });
        return { success: true };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
