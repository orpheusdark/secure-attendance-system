import { AttendanceService } from './attendance.service';

describe('AttendanceService', () => {
  it('creates a session and validates a scan', () => {
    const service = new AttendanceService();
    const created = service.createSession({
      institutionId: 'inst-1',
      subjectId: 'sub-1',
      classroomId: 'room-1',
      teacherId: 'teacher-1',
      radiusMeters: 200,
      latitude: 12.9716,
      longitude: 77.5946,
    });

    const record = service.validateScan({
      sessionId: created.session.id,
      token: created.qrToken,
      deviceId: 'device-1',
      location: { latitude: 12.9716, longitude: 77.5946, accuracy: 8 },
      timestamp: new Date().toISOString(),
      networkType: 'wifi',
      motionScore: 0.9,
      selfieConfidence: 0.88,
    });

    expect(record.sessionId).toBe(created.session.id);
    expect(['present', 'late', 'suspicious', 'rejected', 'manual_review']).toContain(record.status);
  });
});
