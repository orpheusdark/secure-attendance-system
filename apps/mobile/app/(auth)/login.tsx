import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native';
import { z } from 'zod';
import { login } from '../../lib/api';
import { saveSession } from '../../lib/session';
import * as Device from 'expo-device';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const { control, handleSubmit, getValues } = useForm<LoginValues>({
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
      router.replace('/(tabs)/dashboard');
    },
  });

  const onSubmit = handleSubmit(() => {
    loginMutation.mutate({
      email: getValues('email'),
      password: getValues('password'),
    });
  });

  return (
    <View className="flex-1 bg-slate-950 px-6 pt-24">
      <Text className="text-3xl font-bold text-white">Welcome back</Text>
      <Text className="mt-2 text-slate-400">Sign in with your institution, OTP, or biometric session.</Text>
      <View className="mt-10 gap-4">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white"
              placeholder="Email"
              placeholderTextColor="#94a3b8"
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
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white"
              placeholder="Password"
              placeholderTextColor="#94a3b8"
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>
      <Pressable className="mt-8 rounded-2xl bg-cyan-400 px-5 py-4" onPress={onSubmit}>
        {loginMutation.isPending ? (
          <ActivityIndicator color="#082f49" />
        ) : (
          <Text className="text-center text-base font-semibold text-slate-950">Login securely</Text>
        )}
      </Pressable>
      {loginMutation.isError ? (
        <Text className="mt-3 text-center text-sm text-rose-300">{loginMutation.error.message}</Text>
      ) : null}
      <Pressable className="mt-4" onPress={() => router.push('/(auth)/onboarding')}>
        <Text className="text-center text-cyan-300">Need institution access?</Text>
      </Pressable>
    </View>
  );
}
