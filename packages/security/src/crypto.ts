import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export type SignedTokenPayload = {
  sessionId: string;
  nonce: string;
  issuedAt: number;
  expiresAt: number;
  deviceId?: string;
};

export function generateNonce(bytes = 16): string {
  return randomBytes(bytes).toString('base64url');
}

export function signPayload(payload: SignedTokenPayload, secret: string): string {
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = createHmac('sha256', secret).update(encoded).digest('base64url');
  return `${encoded}.${signature}`;
}

export function verifySignedPayload(token: string, secret: string): SignedTokenPayload | null {
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) {
    return null;
  }

  const expectedSignature = createHmac('sha256', secret).update(encoded).digest('base64url');
  if (signature.length !== expectedSignature.length) {
    return null;
  }

  const isValid = timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  if (!isValid) {
    return null;
  }

  const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as SignedTokenPayload;
  if (Date.now() > payload.expiresAt) {
    return null;
  }

  return payload;
}

export function sha256Hex(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}
