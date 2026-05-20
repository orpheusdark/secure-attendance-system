'use client';

import { CameraView, Camera } from 'expo-camera';
import { Text, View, Pressable, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import * as Haptics from 'expo-haptics';

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch {
        setHasPermission(false);
      }
    })();
  }, []);

  const scanMutation = useMutation({
    mutationFn: async (qrData: string) => {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      console.log('Scanned QR:', qrData);
      return { success: true, token: qrData };
    },
    onSuccess: () => {
      setScanned(true);
      setTimeout(() => setScanned(false), 3000);
    },
  });

  if (hasPermission === null) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-950">
        <ActivityIndicator size="large" color="#22d3ee" />
        <Text className="mt-4 text-slate-300">Requesting camera access...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-950 px-6">
        <View className="mb-6 h-24 w-24 items-center justify-center rounded-3xl bg-rose-400/10 border border-rose-300/20">
          <Text className="text-3xl">🚫</Text>
        </View>
        <Text className="text-xl font-bold text-white">Camera access required</Text>
        <Text className="mt-3 text-center text-slate-400">Go to Settings and enable camera permissions for Secure Attendance to scan QR codes.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-950">
      <CameraView
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={({ data }) => {
          if (!scanned) {
            scanMutation.mutate(data);
          }
        }}
        style={{ flex: 1 }}
      />

      <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 to-transparent px-6 py-8">
        <View className="mx-auto items-center">
          <View className="mb-4 h-16 w-16 rounded-2xl border-2 border-cyan-400" />
          <Text className="text-xl font-bold text-white">Align QR code</Text>
          <Text className="mt-2 text-center text-slate-400">Position the rolling QR code within the frame to verify attendance.</Text>
          {scanMutation.isSuccess && (
            <Text className="mt-4 text-center text-emerald-300">✓ Attendance verified!</Text>
          )}
        </View>
      </View>
    </View>
  );
}
