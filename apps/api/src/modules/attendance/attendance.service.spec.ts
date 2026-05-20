import { createRollingAttendanceToken, sha256Hex } from '@secure-attendance/security';
import { AttendanceService } from './attendance.service';
import { PrismaService } from '../../prisma/prisma.service';

const mockPrisma = () => ({
  classroom: { upsert: jest.fn() },
  attendanceSession: { create: jest.fn(), findUnique: jest.fn(), findFirst: jest.fn(), update: jest.fn() },
  qrToken: { create: jest.fn(), update: jest.fn() },
  sessionEvent: { create: jest.fn() },
  attendanceRecord: { create: jest.fn(), findMany: jest.fn() },
});

describe('AttendanceService', () => {
  let service: AttendanceService;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(() => {
    prisma = mockPrisma() as any;
    service = new AttendanceService(prisma as unknown as PrismaService);
  });

  it('validateScan stores a record and consumes a matching token', async () => {
    const token = createRollingAttendanceToken({ sessionId: 'sess-1', secret: 'session-secret', ttlSeconds: 30 });

    prisma.attendanceSession.findUnique.mockResolvedValue({
      id: 'sess-1',
      classroom: { latitude: 12.9716, longitude: 77.5946 },
      radiusMeters: 150,
      qrTokens: [
        {
          id: 'qr-1',
          tokenHash: sha256Hex(token),
          revokedAt: null,
          consumedAt: null,
        },
      ],
    });
    prisma.attendanceRecord.create.mockResolvedValue({ id: 'record-1' });
    prisma.qrToken.update.mockResolvedValue({ id: 'qr-1' });
    prisma.sessionEvent.create.mockResolvedValue({ id: 'event-1' });

    const record = await service.validateScan({
      sessionId: 'sess-1',
      token,
      deviceId: 'device-1',
      location: { latitude: 12.9716, longitude: 77.5946, accuracy: 8 },
      timestamp: new Date().toISOString(),
      networkType: 'wifi',
      motionScore: 0.9,
      selfieConfidence: 0.88,
    });

    expect(record.sessionId).toBe('sess-1');
    expect(prisma.attendanceRecord.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          sessionId: 'sess-1',
          deviceId: 'device-1',
        }),
      }),
    );
    expect(prisma.qrToken.update).toHaveBeenCalledWith({ where: { id: 'qr-1' }, data: { consumedAt: expect.any(Date) } });
  });

  it('getSession throws when the session does not exist', async () => {
    prisma.attendanceSession.findUnique.mockResolvedValue(null);

    await expect(service.getSession('missing-session')).rejects.toThrow('Session not found');
  });
});
