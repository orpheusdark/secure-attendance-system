export type SignedTokenPayload = {
    sessionId: string;
    nonce: string;
    issuedAt: number;
    expiresAt: number;
    deviceId?: string;
};
export declare function generateNonce(bytes?: number): string;
export declare function signPayload(payload: SignedTokenPayload, secret: string): string;
export declare function verifySignedPayload(token: string, secret: string): SignedTokenPayload | null;
export declare function sha256Hex(value: string): string;
