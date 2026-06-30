import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

/**
 * Edge-safe JWT helpers shared by the middleware (Edge runtime) and the API
 * routes (Node runtime). Keep this file free of `next/headers` and other
 * Node-only imports so the middleware can import it.
 */

export const COOKIE_NAME = 'auth_token';

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (secret && secret.length > 0) {
    return new TextEncoder().encode(secret);
  }
  // In production the secret MUST be configured; failing loud avoids signing
  // tokens with a well-known default that anyone could forge.
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'JWT_SECRET no está configurado. Definílo en las variables de entorno de producción (Vercel).'
    );
  }
  return new TextEncoder().encode('dev-secret-change-in-production');
}

export async function signToken(payload: { username: string }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getSecret());
}

export async function verifyToken(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, getSecret());
  return payload;
}
