import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceService } from './attendance.service';
import { PrismaService } from '../../prisma/prisma.service';

const mockPrisma = () => ({
  classroom: { upsert: jest.fn() },
  attendanceSession: { create: jest.fn(), findUnique: jest.fn(), findFirst: jest.fn(), update: jest.fn() },
  qrToken: { create: jest.fn(), update: jest.fn() },
  sessionEvent: { create: jest.fn() },
  attendanceRecord: { create: jest.fn(), findMany: jest.fn() },
});

describe('AttendanceService (unit)', () => {
  let service: AttendanceService;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(async () => {
    prisma = mockPrisma() as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [AttendanceService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<AttendanceService>(AttendanceService);
  });

  it('createSession should create classroom, session, token and sessionEvent', async () => {
    prisma.classroom.upsert.mockResolvedValue({ id: 'class-1', latitude: 1, longitude: 2 });
    prisma.attendanceSession.create.mockResolvedValue({ id: 'sess-1', institutionId: 'inst', subjectId: 'sub', classroomId: 'class-1', teacherId: 't1', startsAt: new Date(), endsAt: new Date(), radiusMeters: 100, verificationMode: 'qr_plus_location', isLocked: false, classroom: { latitude: 1, longitude: 2 } });
    prisma.qrToken.create.mockResolvedValue({ id: 'token-1' });
    prisma.sessionEvent.create.mockResolvedValue({ id: 'evt-1' });

    const res = await service.createSession({ institutionId: 'inst', subjectId: 'sub', classroomId: 'class-1', teacherId: 't1' });
    expect(res.session.id).toBe('sess-1');
    expect(res.qrToken).toBeDefined();
    expect(prisma.classroom.upsert).toHaveBeenCalled();
    expect(prisma.qrToken.create).toHaveBeenCalled();
    expect(prisma.sessionEvent.create).toHaveBeenCalled();
  });

  it('lockSession should update isLocked and create event', async () => {
    prisma.attendanceSession.findUnique.mockResolvedValue({ id: 'sess-1' });
    prisma.attendanceSession.update.mockResolvedValue({ id: 'sess-1', isLocked: true });
    prisma.sessionEvent.create.mockResolvedValue({ id: 'evt-locked' });

    const out = await service.lockSession('sess-1');
    expect(out).toEqual({ sessionId: 'sess-1', isLocked: true });
    expect(prisma.attendanceSession.update).toHaveBeenCalledWith({ where: { id: 'sess-1' }, data: { isLocked: true } });
  });
});
