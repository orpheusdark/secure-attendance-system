import { type SignedTokenPayload } from './crypto';
export type RollingTokenOptions = {
    sessionId: string;
    deviceId?: string;
    secret: string;
    ttlSeconds: number;
};
export declare function createRollingAttendanceToken(options: RollingTokenOptions): string;
export declare function validateRollingAttendanceToken(token: string, secret: string): SignedTokenPayload | null;
