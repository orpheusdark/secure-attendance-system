import { generateNonce, signPayload, verifySignedPayload, type SignedTokenPayload } from './crypto';

export type RollingTokenOptions = {
  sessionId: string;
  deviceId?: string;
  secret: string;
  ttlSeconds: number;
};

export function createRollingAttendanceToken(options: RollingTokenOptions): string {
  const issuedAt = Date.now();
  const expiresAt = issuedAt + options.ttlSeconds * 1000;
  const payload: SignedTokenPayload = {
    sessionId: options.sessionId,
    nonce: generateNonce(),
    issuedAt,
    expiresAt,
    deviceId: options.deviceId,
  };

  return signPayload(payload, options.secret);
}

export function validateRollingAttendanceToken(token: string, secret: string): SignedTokenPayload | null {
  return verifySignedPayload(token, secret);
}
