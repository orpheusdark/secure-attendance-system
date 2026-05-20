"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRollingAttendanceToken = createRollingAttendanceToken;
exports.validateRollingAttendanceToken = validateRollingAttendanceToken;
const crypto_1 = require("./crypto");
function createRollingAttendanceToken(options) {
    const issuedAt = Date.now();
    const expiresAt = issuedAt + options.ttlSeconds * 1000;
    const payload = {
        sessionId: options.sessionId,
        nonce: (0, crypto_1.generateNonce)(),
        issuedAt,
        expiresAt,
        deviceId: options.deviceId,
    };
    return (0, crypto_1.signPayload)(payload, options.secret);
}
function validateRollingAttendanceToken(token, secret) {
    return (0, crypto_1.verifySignedPayload)(token, secret);
}
