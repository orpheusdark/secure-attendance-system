import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { GlassCard, PrimaryButton, Screen, StatusPill } from '../../components/experience';

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
          setTimeout(() => router.replace('/(auth)/login' as never), 1200);
        } else {
          setStatus('error');
          setMessage(`API returned status ${response.status}. Please try again.`);
        }
      } catch {
        setStatus('error');
        const apiUrl =
          (globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }).process?.env?.['EXPO_PUBLIC_API_URL'] ??
          'http://localhost:4000/api/v1';
        setMessage(`Cannot reach API at ${apiUrl}. Check your network or API URL.`);
      }
    };

    checkHealth();
  }, []);

  return (
    <Screen>
      <View className="flex-1 justify-center">
        <GlassCard className="space-y-6">
          <View className="items-center gap-4">
            <StatusPill tone={status === 'healthy' ? 'emerald' : status === 'error' ? 'rose' : 'sky'} label={status === 'checking' ? 'Checking' : status === 'healthy' ? 'Connected' : 'Attention'} />
            <Text className="text-center text-3xl font-bold text-white">System health check</Text>
            <Text className="text-center text-sm leading-6 text-slate-300">We validate API reachability before entering the trust layer.</Text>
          </View>

          <View className="items-center gap-5">
            {status === 'checking' ? <ActivityIndicator size="large" color="#38bdf8" /> : null}
            {status === 'healthy' ? <Text className="text-5xl">✓</Text> : null}
            {status === 'error' ? <Text className="text-5xl">⚠</Text> : null}
            <Text className={`text-center text-base ${status === 'healthy' ? 'text-emerald-300' : status === 'error' ? 'text-rose-200' : 'text-slate-200'}`}>{message}</Text>
          </View>

          {status === 'error' ? (
            <View className="space-y-3">
              <PrimaryButton title="Retry health check" onPress={() => router.replace('/(auth)/health' as never)} tone="sky" />
              <Pressable onPress={() => router.replace('/(auth)/login' as never)}>
                <Text className="text-center text-sm text-cyan-300">Skip to login</Text>
              </Pressable>
            </View>
          ) : null}
        </GlassCard>
      </View>
    </Screen>
  );
}
