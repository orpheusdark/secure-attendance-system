import { Platform } from 'react-native';

function resolveApiUrl() {
  const rawUrl =
    (globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }).process?.env?.['EXPO_PUBLIC_API_URL'] ??
    'http://localhost:4000/api/v1';

  try {
    const url = new URL(rawUrl);

    if (Platform.OS === 'android' && (url.hostname === 'localhost' || url.hostname === '127.0.0.1')) {
      url.hostname = '10.0.2.2';
    }

    return url.toString().replace(/\/$/, '');
  } catch {
    return rawUrl.replace(/\/$/, '');
  }
}

const apiUrl = resolveApiUrl();

type RequestOptions = RequestInit & { token?: string };

async function requestJson<T>(path: string, options: RequestOptions = {}): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${apiUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
        ...(options.headers ?? {}),
      },
    });
  } catch {
    throw new Error(
      `Unable to reach the API at ${apiUrl}. If you're using Expo Go on a phone, set EXPO_PUBLIC_API_URL to your computer's LAN IP (for example http://192.168.1.10:4000/api/v1) and restart Expo.`,
    );
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function login(email: string, password: string, deviceId: string) {
  return requestJson<{ accessToken: string; refreshToken: string; user: { id: string; role: string; name: string; email: string } }>(
    '/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({ email, password, method: 'password', deviceId }),
    },
  );
}

export async function getAnalyticsOverview() {
  return requestJson<{ attendanceRate: number; fraudAttempts: number; suspiciousSessions: number; averageValidationMs: number }>(
    '/analytics/overview',
  );
}

export async function getNotifications(userId: string) {
  return requestJson<Array<{ id: string; type: string; title: string; message: string; createdAt: string }>>(`/notifications?userId=${encodeURIComponent(userId)}`);
}

export async function getLatestSession(teacherId?: string) {
  return requestJson<Record<string, unknown>>(
    teacherId ? `/attendance/sessions/latest?teacherId=${encodeURIComponent(teacherId)}` : '/attendance/sessions/latest',
  );
}
