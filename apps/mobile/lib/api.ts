import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

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

  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
        ...(options.headers ?? {}),
      },
    });
  } catch (err) {
    throw new Error(
      `Unable to reach the API at ${apiBaseUrl}. If you're using Expo Go on a phone, set EXPO_PUBLIC_API_URL to your computer's LAN IP (for example http://192.168.1.10:4000/api/v1) and restart Expo.`,
    );
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function login(email: string, password: string, deviceId: string) {
  const result = await requestJson<{ accessToken: string; refreshToken: string; user: { id: string; role: string; name: string; email: string } }>(
    '/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({ email, password, method: 'password', deviceId }),
    },
  );
  // Persist the working API URL
  await SecureStore.setItemAsync('api_url', apiBaseUrl);
  return result;
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
