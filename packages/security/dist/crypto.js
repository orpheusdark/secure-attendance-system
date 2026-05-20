"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNonce = generateNonce;
exports.signPayload = signPayload;
exports.verifySignedPayload = verifySignedPayload;
exports.sha256Hex = sha256Hex;
const node_crypto_1 = require("node:crypto");
function generateNonce(bytes = 16) {
    return (0, node_crypto_1.randomBytes)(bytes).toString('base64url');
}
function signPayload(payload, secret) {
    const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = (0, node_crypto_1.createHmac)('sha256', secret).update(encoded).digest('base64url');
    return `${encoded}.${signature}`;
}
function verifySignedPayload(token, secret) {
    const [encoded, signature] = token.split('.');
    if (!encoded || !signature) {
        return null;
    }
    const expectedSignature = (0, node_crypto_1.createHmac)('sha256', secret).update(encoded).digest('base64url');
    if (signature.length !== expectedSignature.length) {
        return null;
    }
    const isValid = (0, node_crypto_1.timingSafeEqual)(Buffer.from(signature), Buffer.from(expectedSignature));
    if (!isValid) {
        return null;
    }
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'));
    if (Date.now() > payload.expiresAt) {
        return null;
    }
    return payload;
}
function sha256Hex(value) {
    return (0, node_crypto_1.createHash)('sha256').update(value).digest('hex');
}
