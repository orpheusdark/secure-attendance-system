import type { AttendanceStatus } from '@secure-attendance/contracts';
import { type Coordinates } from './geo';
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
export declare function assessFraud(input: FraudInput): FraudAssessment;
