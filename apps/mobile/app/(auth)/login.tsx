import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import * as Device from 'expo-device';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Text, TextInput, View } from 'react-native';
import { theme } from '@secure-attendance/ui';
import { z } from 'zod';
import { login } from '../../lib/api';
import { saveSession } from '../../lib/session';
import { GlassCard, MetricTile, PrimaryButton, PremiumTitle, Screen, StatusPill } from '../../components/experience';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const { control, handleSubmit } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const loginMutation = useMutation({
    mutationFn: async (values: LoginValues) => {
      const deviceId = Device.deviceName ?? Device.osInternalBuildId ?? 'mobile-device';
      return login(values.email, values.password, deviceId);
    },
    onSuccess: async (session) => {
      await saveSession(session);
      router.replace('/(tabs)/dashboard' as never);
    },
  });

  const onSubmit = handleSubmit((values) => {
    loginMutation.mutate(values);
  });

  return (
    <Screen>
      <View className="flex-1 justify-between py-4">
        <View className="space-y-6">
          <PremiumTitle
            eyebrow="Secure login"
            title="Welcome back."
            subtitle="Authenticate with an institution email and a trusted device session to unlock the live attendance console."
          />

          <View className="flex-row flex-wrap justify-between gap-3">
            <View className="w-[48%]"><MetricTile label="Trust score" value="97%" tone="emerald" /></View>
            <View className="w-[48%]"><MetricTile label="Active policy" value="Biometric" tone="cyan" /></View>
          </View>

          <GlassCard>
            <View className="gap-4">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={{ borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.03)', paddingHorizontal: 16, paddingVertical: 16, color: theme.colors.text }}
                    placeholder="Email"
                    placeholderTextColor={theme.colors.muted}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={{ borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.03)', paddingHorizontal: 16, paddingVertical: 16, color: theme.colors.text }}
                    placeholder="Password"
                    placeholderTextColor={theme.colors.muted}
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </View>

            <View className="mt-5 gap-3">
              <PrimaryButton title={loginMutation.isPending ? 'Authenticating...' : 'Login securely'} onPress={onSubmit} tone="sky" />
              <StatusPill tone="amber" label="Biometric-ready" />
            </View>

            {loginMutation.isError ? <Text style={{ marginTop: 16, fontSize: 14, color: theme.colors.danger }}>{loginMutation.error.message}</Text> : null}
          </GlassCard>
        </View>

        <View className="gap-3">
          <PrimaryButton title="Need institution access?" onPress={() => router.push('/(auth)/signup' as never)} tone="emerald" />
          <View className="flex-row items-center justify-between">
            <Text style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.4, color: theme.colors.muted }}>Demo</Text>
            <Text style={{ fontSize: 11, color: theme.colors.muted }}>teacher@nexus.edu / Password123!</Text>
          </View>
        </View>
      </View>
    </Screen>
  );
}
