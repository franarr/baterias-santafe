import { cookies } from 'next/headers';
import { COOKIE_NAME, signToken, verifyToken } from '@/lib/jwt';

export { COOKIE_NAME, signToken, verifyToken };

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthToken();
  if (!token) return false;
  try {
    await verifyToken(token);
    return true;
  } catch {
    return false;
  }
}
