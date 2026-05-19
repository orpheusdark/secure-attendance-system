import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

test('seeded teacher and student users exist', async () => {
  const teacher = await prisma.user.findUnique({ where: { email: 'teacher@nexus.edu' } });
  const student = await prisma.user.findUnique({ where: { email: 'student@nexus.edu' } });
  expect(teacher).not.toBeNull();
  expect(student).not.toBeNull();
  expect(teacher!.role).toBe(UserRole.teacher);
  expect(student!.role).toBe(UserRole.student);
});
