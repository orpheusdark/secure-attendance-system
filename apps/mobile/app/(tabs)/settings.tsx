'use client';

import { Text, View, Pressable, Switch } from 'react-native';
import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useMutation } from '@tanstack/react-query';

export default function SettingsScreen() {
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [deviceName, setDeviceName] = useState('My Device');
  const [apiUrl, setApiUrl] = useState('');

  useEffect(() => {
    (async () => {
      const stored = await SecureStore.getItemAsync('biometric_enabled');
      setBiometricEnabled(stored === 'true');
      const url = await SecureStore.getItemAsync('api_url');
      if (url) setApiUrl(url);
    })();
  }, []);

  const saveBiometric = useMutation({
    mutationFn: async (enabled: boolean) => {
      await SecureStore.setItemAsync('biometric_enabled', String(enabled));
      return enabled;
    },
    onSuccess: (enabled) => setBiometricEnabled(enabled),
  });

  const saveApiUrl = useMutation({
    mutationFn: async (url: string) => {
      await SecureStore.setItemAsync('api_url', url);
      return url;
    },
  });

  return (
    <View className="flex-1 bg-slate-950 px-5 pt-16 pb-8">
      <Text className="text-3xl font-bold text-white">Settings</Text>
      <Text className="mt-2 text-slate-400">Manage your device and preferences.</Text>

      <View className="mt-8 space-y-4">
        <View className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="font-semibold text-white">Biometric unlock</Text>
              <Text className="mt-1 text-sm text-slate-400">Use fingerprint for faster login</Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={(value) => saveBiometric.mutate(value)}
              trackColor={{ false: '#334155', true: '#0891b2' }}
              thumbColor={biometricEnabled ? '#22d3ee' : '#64748b'}
            />
          </View>
        </View>

        <View className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <Text className="font-semibold text-white">Device name</Text>
          <Text className="mt-2 text-sm text-slate-400">{deviceName}</Text>
          <Text className="mt-3 text-xs text-slate-500">Used to identify your device in fraud detection logs.</Text>
        </View>

        <View className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <Text className="font-semibold text-white">API URL</Text>
          <Text className="mt-2 text-xs text-cyan-300 break-words">{apiUrl || 'Default (localhost:4000)'}</Text>
          <Pressable className="mt-4 rounded-2xl bg-cyan-400/20 px-4 py-2">
            <Text className="text-center text-sm font-semibold text-cyan-300">Edit URL</Text>
          </Pressable>
        </View>

        <View className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-5">
          <Text className="font-semibold text-amber-200">Device Trust</Text>
          <Text className="mt-2 text-sm text-amber-100">This device is marked as trusted. Clear if you suspect unauthorized access.</Text>
          <Pressable className="mt-4 rounded-2xl bg-amber-600/30 px-4 py-2">
            <Text className="text-center text-sm font-semibold text-amber-300">Revoke Trust</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
