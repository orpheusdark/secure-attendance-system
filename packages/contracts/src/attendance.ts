import { z } from 'zod';

export const attendanceStatusSchema = z.enum(['present', 'late', 'suspicious', 'rejected', 'manual_review']);
export type AttendanceStatus = z.infer<typeof attendanceStatusSchema>;

export const scanPayloadSchema = z.object({
  sessionId: z.string(),
  token: z.string(),
  deviceId: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
    accuracy: z.number(),
  }),
  timestamp: z.string().datetime(),
  networkType: z.string(),
  bluetoothStrength: z.number().optional(),
  motionScore: z.number().min(0).max(1).optional(),
  selfieConfidence: z.number().min(0).max(1).optional(),
});

export type ScanPayload = z.infer<typeof scanPayloadSchema>;
