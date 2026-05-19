import type { AttendanceStatus } from '@secure-attendance/contracts';
import { isWithinRadius, type Coordinates } from './geo';

export type FraudInput = {
  expectedLocation: Coordinates;
  actualLocation: Coordinates;
  distanceThresholdMeters: number;
  accuracyMeters: number;
  deviceTrustScore: number;
  motionScore?: number;
  selfieConfidence?: number;
  recentReplayAttempts: number;
  simultaneousDeviceCount: number;
  qrFreshnessSeconds: number;
  gpsSpoofIndicators: number;
};

export type FraudAssessment = {
  status: AttendanceStatus;
  fraudScore: number;
  reasons: string[];
};

export function assessFraud(input: FraudInput): FraudAssessment {
  const reasons: string[] = [];
  let fraudScore = 0;

  const insideRadius = isWithinRadius(input.expectedLocation, input.actualLocation, input.distanceThresholdMeters);
  if (!insideRadius) {
    fraudScore += 30;
    reasons.push('outside_allowed_radius');
  }

  if (input.accuracyMeters > input.distanceThresholdMeters) {
    fraudScore += 10;
    reasons.push('low_location_accuracy');
  }

  if (input.deviceTrustScore < 0.4) {
    fraudScore += 20;
    reasons.push('untrusted_device');
  }

  if ((input.motionScore ?? 1) < 0.35) {
    fraudScore += 10;
    reasons.push('motion_authenticity_low');
  }

  if ((input.selfieConfidence ?? 1) < 0.65) {
    fraudScore += 15;
    reasons.push('face_confidence_low');
  }

  if (input.recentReplayAttempts > 0) {
    fraudScore += 20 * input.recentReplayAttempts;
    reasons.push('replay_attempt_detected');
  }

  if (input.simultaneousDeviceCount > 1) {
    fraudScore += 15 * (input.simultaneousDeviceCount - 1);
    reasons.push('multi_device_fraud');
  }

  if (input.qrFreshnessSeconds > 15) {
    fraudScore += 20;
    reasons.push('stale_qr');
  }

  if (input.gpsSpoofIndicators > 0) {
    fraudScore += 25 * input.gpsSpoofIndicators;
    reasons.push('gps_spoof_indicator');
  }

  if (fraudScore >= 70) {
    return { status: 'rejected', fraudScore, reasons };
  }

  if (fraudScore >= 40) {
    return { status: 'suspicious', fraudScore, reasons };
  }

  return { status: insideRadius ? 'present' : 'late', fraudScore, reasons };
}
