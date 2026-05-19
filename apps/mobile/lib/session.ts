import * as SecureStore from 'expo-secure-store';

const sessionKey = 'secure-attendance-session';

export type StoredSession = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    role: string;
    name: string;
    email: string;
  };
};

export async function saveSession(session: StoredSession) {
  await SecureStore.setItemAsync(sessionKey, JSON.stringify(session));
}

export async function loadSession(): Promise<StoredSession | null> {
  const value = await SecureStore.getItemAsync(sessionKey);
  return value ? (JSON.parse(value) as StoredSession) : null;
}
