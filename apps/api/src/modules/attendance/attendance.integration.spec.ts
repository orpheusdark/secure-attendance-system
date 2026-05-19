import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

test('seeded attendance session and subject exist', async () => {
  const session = await prisma.attendanceSession.findFirst();
  expect(session).not.toBeNull();
  const subject = await prisma.subject.findUnique({ where: { id: session!.subjectId } });
  expect(subject).not.toBeNull();
  expect(subject!.code).toBe('SEC401');
});
