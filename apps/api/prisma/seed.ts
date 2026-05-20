import { hash } from 'bcryptjs';
import { PrismaClient, UserRole, VerificationMode } from '@prisma/client';

const prisma = new PrismaClient();
const demoPassword = 'Password123!';

async function main() {
  const institution = await prisma.institution.upsert({
    where: { code: 'NEXUS' },
    update: {},
    create: {
      name: 'Nexus Institute of Technology',
      code: 'NEXUS',
      timezone: 'Asia/Kolkata',
      geofenceRadiusMeters: 180,
    },
  });

  const department = await prisma.department.upsert({
    where: {
      institutionId_code: {
        institutionId: institution.id,
        code: 'CSE',
      },
    },
    update: {},
    create: {
      institutionId: institution.id,
      name: 'Computer Science and Engineering',
      code: 'CSE',
    },
  });

  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@nexus.edu' },
    update: {
      passwordHash: await hash(demoPassword, 10),
      deviceTrust: 'trusted',
    },
    create: {
      institutionId: institution.id,
      departmentId: department.id,
      name: 'Dr. Ada Mentor',
      email: 'teacher@nexus.edu',
      role: UserRole.teacher,
      passwordHash: await hash(demoPassword, 10),
      deviceTrust: 'trusted',
    },
  });

  const student = await prisma.user.upsert({
    where: { email: 'student@nexus.edu' },
    update: {
      passwordHash: await hash(demoPassword, 10),
      deviceTrust: 'trusted',
    },
    create: {
      institutionId: institution.id,
      departmentId: department.id,
      name: 'Jordan Student',
      email: 'student@nexus.edu',
      role: UserRole.student,
      passwordHash: await hash(demoPassword, 10),
      deviceTrust: 'trusted',
    },
  });

  const subject = await prisma.subject.upsert({
    where: {
      institutionId_code: {
        institutionId: institution.id,
        code: 'SEC401',
      },
    },
    update: {},
    create: {
      institutionId: institution.id,
      departmentId: department.id,
      name: 'Secure Attendance Systems',
      code: 'SEC401',
    },
  });

  const classroom = await prisma.classroom.create({
    data: {
      institutionId: institution.id,
      name: 'Room A-204',
      building: 'Engineering Block',
      floor: '2',
      latitude: 12.9716,
      longitude: 77.5946,
      accuracyMeters: 20,
    },
  });

  const session = await prisma.attendanceSession.create({
    data: {
      institutionId: institution.id,
      subjectId: subject.id,
      classroomId: classroom.id,
      teacherId: teacher.id,
      startsAt: new Date(),
      endsAt: new Date(Date.now() + 60 * 60 * 1000),
      radiusMeters: 180,
      verificationMode: VerificationMode.qr_plus_location,
    },
  });

  await prisma.deviceRegistry.upsert({
    where: {
      userId_deviceId: {
        userId: student.id,
        deviceId: 'seed-device-001',
      },
    },
    update: {
      deviceName: 'Student iPhone',
      platform: 'ios',
      trustScore: 0.92,
      lastIpAddress: '127.0.0.1',
    },
    create: {
      userId: student.id,
      deviceId: 'seed-device-001',
      deviceName: 'Student iPhone',
      platform: 'ios',
      trustScore: 0.92,
      lastIpAddress: '127.0.0.1',
    },
  });

  await prisma.notification.create({
    data: {
      userId: student.id,
      type: 'session_started',
      title: 'Session started',
      message: 'Your Secure Attendance session is live.',
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: teacher.id,
      institutionId: institution.id,
      action: 'seed:create',
      entity: 'attendance_session',
      entityId: session.id,
      metadata: { classroom: classroom.name, subject: subject.code },
    },
  });

  console.log({
    institution: institution.code,
    teacher: teacher.email,
    student: student.email,
    password: demoPassword,
    session: session.id,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
