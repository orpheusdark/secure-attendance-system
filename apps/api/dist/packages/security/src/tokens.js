import { generateNonce, signPayload, verifySignedPayload } from './crypto';
export function createRollingAttendanceToken(options) {
    const issuedAt = Date.now();
    const expiresAt = issuedAt + options.ttlSeconds * 1000;
    const payload = {
        sessionId: options.sessionId,
        nonce: generateNonce(),
        issuedAt,
        expiresAt,
        deviceId: options.deviceId,
    };
    return signPayload(payload, options.secret);
}
export function validateRollingAttendanceToken(token, secret) {
    return verifySignedPayload(token, secret);
}
