import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

const demoUser = {
  id: 'demo-teacher',
  role: 'teacher' as const,
  name: 'Dr. Ada Mentor',
  email: 'teacher@nexus.edu',
};

const demoNotifications = [
  {
    id: 'demo-notification-1',
    type: 'session_started',
    title: 'Session started',
    message: 'Your demo Secure Attendance session is live.',
    createdAt: new Date().toISOString(),
  },
];

const demoAnalytics = {
  attendanceRate: 96.4,
  fraudAttempts: 12,
  suspiciousSessions: 4,
  averageValidationMs: 418,
};

const demoLatestSession = {
  id: 'demo-session',
  name: 'Demo Session',
  status: 'live',
  trust: 97,
  scans: 1,
};

export function resolveApiUrl() {
  const rawUrl =
    (globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }).process?.env?.['EXPO_PUBLIC_API_URL'] ??
    'http://localhost:4000/api/v1';

  try {
    const url = new URL(rawUrl);

    if (Platform.OS === 'android' && (url.hostname === 'localhost' || url.hostname === '127.0.0.1')) {
      url.hostname = '10.0.2.2';
    }

    if ((url.hostname === 'localhost' || url.hostname === '127.0.0.1') && Platform.OS !== 'web') {
      const hostUri = Constants.expoConfig?.hostUri ?? Constants.expoGoConfig?.debuggerHost ?? Constants.expoGoConfig?.hostUri;

      if (hostUri) {
        const host = hostUri.split(':')[0];
        if (host && host !== 'localhost' && host !== '127.0.0.1') {
          url.hostname = host;
        }
      }
    }

    return url.toString().replace(/\/$/, '');
  } catch {
    return rawUrl.replace(/\/$/, '');
  }
}

export const apiBaseUrl = resolveApiUrl();

type RequestOptions = RequestInit & { token?: string };

async function requestJson<T>(path: string, options: RequestOptions = {}): Promise<T> {
  let response: Response;
  const timeoutMs = 8000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      signal: options.signal ?? controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
        ...(options.headers ?? {}),
      },
    });
  } catch (err) {
    if ((err as Error).name === 'AbortError') {
      throw new Error(`Timed out waiting for the API at ${apiBaseUrl}.`);
    }
    throw new Error(
      `Unable to reach the API at ${apiBaseUrl}. If you're using Expo Go on a phone, set EXPO_PUBLIC_API_URL to your computer's LAN IP (for example http://192.168.1.10:4000/api/v1) and restart Expo.`,
    );
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function login(email: string, password: string, deviceId: string) {
  const demoMode = await SecureStore.getItemAsync('demo_mode');

  if (demoMode === 'true') {
    if (email.toLowerCase() !== demoUser.email || password !== 'Password123!') {
      throw new Error(`Demo mode is active. Use ${demoUser.email} / Password123!`);
    }

    const accessToken = `demo-access-${deviceId}`;
    const refreshToken = `demo-refresh-${deviceId}`;

    await SecureStore.setItemAsync('api_url', apiBaseUrl);
    return { accessToken, refreshToken, user: demoUser };
  }

  try {
    const result = await requestJson<{ accessToken: string; refreshToken: string; user: { id: string; role: string; name: string; email: string } }>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password, method: 'password', deviceId }),
      },
    );

    await SecureStore.setItemAsync('api_url', apiBaseUrl);
    return result;
  } catch {
    if (email.toLowerCase() !== demoUser.email || password !== 'Password123!') {
      throw new Error(`Demo mode is active. Use ${demoUser.email} / Password123!`);
    }

    const accessToken = `demo-access-${deviceId}`;
    const refreshToken = `demo-refresh-${deviceId}`;

    await SecureStore.setItemAsync('api_url', apiBaseUrl);
    await SecureStore.setItemAsync('demo_mode', 'true');

    return { accessToken, refreshToken, user: demoUser };
  }
}

export async function getAnalyticsOverview() {
  try {
    return await requestJson<{ attendanceRate: number; fraudAttempts: number; suspiciousSessions: number; averageValidationMs: number }>('/analytics/overview');
  } catch {
    return demoAnalytics;
  }
}

export async function getNotifications(userId: string) {
  try {
    return await requestJson<Array<{ id: string; type: string; title: string; message: string; createdAt: string }>>(`/notifications?userId=${encodeURIComponent(userId)}`);
  } catch {
    return demoNotifications.map(({ id, type, title, message, createdAt }) => ({ id, type, title, message, createdAt }));
  }
}

export async function getLatestSession(teacherId?: string) {
  try {
    return await requestJson<Record<string, unknown>>(
      teacherId ? `/attendance/sessions/latest?teacherId=${encodeURIComponent(teacherId)}` : '/attendance/sessions/latest',
    );
  } catch {
    return demoLatestSession as Record<string, unknown>;
  }
}
