import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function HealthCheckScreen() {
  const [status, setStatus] = useState<'checking' | 'healthy' | 'error'>('checking');
  const [message, setMessage] = useState('Checking API connectivity...');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const apiUrl =
          (globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }).process?.env?.['EXPO_PUBLIC_API_URL'] ??
          'http://localhost:4000/api/v1';

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(`${apiUrl.replace('/api/v1', '')}/`, {
          method: 'GET',
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          setStatus('healthy');
          setMessage('API is reachable. Proceeding to login...');
          // @ts-ignore - Route exists but TypeScript doesn't recognize dynamic routes
          setTimeout(() => router.replace('/(auth)/login'), 2000);
        } else {
          setStatus('error');
          setMessage(`API returned status ${response.status}. Please try again.`);
        }
      } catch (error) {
        setStatus('error');
        const apiUrl =
          (globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }).process?.env?.['EXPO_PUBLIC_API_URL'] ??
          'http://localhost:4000/api/v1';
        setMessage(`Cannot reach API at ${apiUrl}. Check your connection or API URL in Settings.`);
      }
    };

    checkHealth();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-slate-950 px-6">
      {status === 'checking' && (
        <>
          <ActivityIndicator size="large" color="#22d3ee" />
          <Text className="mt-6 text-center text-lg font-semibold text-white">{message}</Text>
        </>
      )}

      {status === 'healthy' && (
        <>
          <View className="mb-6 h-24 w-24 items-center justify-center rounded-3xl bg-emerald-400/15 border border-emerald-300/20">
            <Text className="text-4xl">✓</Text>
          </View>
          <Text className="text-center text-lg font-semibold text-emerald-300">{message}</Text>
        </>
      )}

      {status === 'error' && (
        <>
          <View className="mb-6 h-24 w-24 items-center justify-center rounded-3xl bg-rose-400/15 border border-rose-300/20">
            <Text className="text-4xl">⚠</Text>
          </View>
          <Text className="mt-4 text-center text-lg font-semibold text-white">Connection Error</Text>
          <Text className="mt-3 text-center text-slate-400">{message}</Text>
          <Pressable
            className="mt-8 rounded-2xl bg-cyan-400 px-8 py-4"
            // @ts-ignore - Route exists but TypeScript doesn't recognize dynamic routes
            onPress={() => router.replace('/(auth)/health')}
          >
            <Text className="text-center font-semibold text-slate-950">Retry</Text>
          </Pressable>
          <Pressable className="mt-4 rounded-2xl px-8 py-4" onPress={() => {
            // @ts-ignore - Route exists but TypeScript doesn't recognize dynamic routes
            router.replace('/(auth)/login')
          }}>
            <Text className="text-center font-semibold text-cyan-300">Skip Check</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}
