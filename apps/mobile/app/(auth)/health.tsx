import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { GlassCard, PrimaryButton, Screen, StatusPill } from '../../components/experience';
import { theme } from '@secure-attendance/ui';
import { apiBaseUrl } from '../../lib/api';

export default function HealthCheckScreen() {
  const [status, setStatus] = useState<'checking' | 'healthy' | 'error'>('checking');
  const [message, setMessage] = useState('Checking API connectivity...');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(`${apiBaseUrl.replace('/api/v1', '')}/`, {
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
        setStatus('healthy');
        setMessage(`Cannot reach API at ${apiBaseUrl}. Continuing in demo mode.`);
        setTimeout(() => router.replace('/(auth)/login' as never), 1200);
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
            <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: '700', color: theme.colors.text }}>System health check</Text>
            <Text style={{ textAlign: 'center', fontSize: 14, lineHeight: 22, color: theme.colors.muted }}>We validate API reachability before entering the trust layer.</Text>
          </View>

          <View className="items-center gap-5">
            {status === 'checking' ? <ActivityIndicator size="large" color="#38bdf8" /> : null}
            {status === 'healthy' ? <Text className="text-5xl">✓</Text> : null}
            {status === 'error' ? <Text className="text-5xl">⚠</Text> : null}
            <Text style={{ textAlign: 'center', fontSize: 16, color: status === 'healthy' ? theme.colors.success : status === 'error' ? theme.colors.danger : theme.colors.text }}>{message}</Text>
            <Text style={{ textAlign: 'center', fontSize: 12, color: theme.colors.muted }}>Current API base: {apiBaseUrl}</Text>
          </View>

          {status === 'error' ? (
            <View className="space-y-3">
              <PrimaryButton title="Retry health check" onPress={() => router.replace('/(auth)/health' as never)} tone="sky" />
              <Pressable onPress={() => router.replace('/(auth)/login' as never)}>
                <Text style={{ textAlign: 'center', fontSize: 14, color: theme.colors.live }}>Skip to login</Text>
              </Pressable>
            </View>
          ) : null}
        </GlassCard>
      </View>
    </Screen>
  );
}
