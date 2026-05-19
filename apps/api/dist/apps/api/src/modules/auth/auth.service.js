var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { createRollingAttendanceToken, sha256Hex } from "@secure-attendance/security";
import { PrismaService } from '../../prisma/prisma.service';
let AuthService = class AuthService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    hashToken(token) {
        return sha256Hex(token);
    }
    async login(input) {
        if (!input.email || !input.deviceId) {
            throw new UnauthorizedException('Missing credentials');
        }
        const userRecord = await this.prisma.user.findUnique({ where: { email: input.email } });
        if (!userRecord) {
            throw new UnauthorizedException('Invalid credentials');
        }
        if (userRecord.passwordHash) {
            const passwordValid = await compare(input.password ?? '', userRecord.passwordHash);
            if (!passwordValid) {
                throw new UnauthorizedException('Invalid credentials');
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
        const accessToken = createRollingAttendanceToken({
            sessionId: user.id,
            secret: process.env.TOKEN_SECRET ?? 'dev-secret',
            ttlSeconds: 900,
            deviceId: input.deviceId,
        });
        const refreshToken = createRollingAttendanceToken({
            sessionId: user.id,
            secret: process.env.REFRESH_SECRET ?? 'refresh-secret',
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
            throw new UnauthorizedException('Invalid session');
        }
        await this.prisma.authSession.update({
            where: { id: session.id },
            data: { revokedAt: new Date() },
        });
        const accessToken = createRollingAttendanceToken({
            sessionId: session.user.id,
            secret: process.env.TOKEN_SECRET ?? 'dev-secret',
            ttlSeconds: 900,
            deviceId,
        });
        const nextRefreshToken = createRollingAttendanceToken({
            sessionId: session.user.id,
            secret: process.env.REFRESH_SECRET ?? 'refresh-secret',
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
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AuthService);
export { AuthService };
