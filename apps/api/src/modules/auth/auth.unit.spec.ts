import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service';

const mockPrisma = () => ({
  user: { findUnique: jest.fn() },
  authSession: { create: jest.fn(), findUnique: jest.fn(), update: jest.fn() },
  deviceRegistry: { upsert: jest.fn() },
  auditLog: { create: jest.fn() },
});

describe('AuthService (unit)', () => {
  let service: AuthService;
  let prisma: ReturnType<typeof mockPrisma>;

  beforeEach(async () => {
    prisma = mockPrisma() as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('login throws when missing credentials', async () => {
    await expect(service.login({ email: '', deviceId: '', method: 'password', password: '' })).rejects.toThrow();
  });

  it('login succeeds and creates sessions when user exists and password matches', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 'u1', institutionId: 'inst', name: 'User', email: 'user@example.com', role: 'teacher', passwordHash: '$2a$10$hash', deviceTrust: 'trusted' });
    // mock bcrypt compare to return true by temporarily overriding
    jest.spyOn(require('bcryptjs'), 'compare').mockResolvedValue(true);
    prisma.authSession.create.mockResolvedValue({ id: 'auth-1' });
    prisma.deviceRegistry.upsert.mockResolvedValue({ id: 'dev-1' });
    prisma.auditLog.create.mockResolvedValue({ id: 'log-1' });

    const out = await service.login({ email: 'user@example.com', password: 'secret', method: 'password', deviceId: 'dev-1' });
    expect(out.user.email).toBe('user@example.com');
    expect(out.accessToken).toBeDefined();
    expect(prisma.authSession.create).toHaveBeenCalled();
  });
});
