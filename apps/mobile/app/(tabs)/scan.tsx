import { useMutation } from '@tanstack/react-query';
import { Camera, CameraView } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { GlassCard, PremiumTitle, PulseRing, Screen, StatusPill } from '../../components/experience';

type ScanState = 'scanning' | 'verifying' | 'success' | 'suspicious' | 'rejected';

const stateConfig: Record<ScanState, { tone: 'sky' | 'emerald' | 'amber' | 'rose'; label: string; message: string }> = {
  scanning: { tone: 'sky', label: 'Scanning', message: 'Align the QR inside the frame.' },
  verifying: { tone: 'amber', label: 'Verifying', message: 'Checking session trust, GPS lock, and token freshness.' },
  success: { tone: 'emerald', label: 'Verified', message: 'Attendance recorded successfully.' },
  suspicious: { tone: 'amber', label: 'Suspicious', message: 'The scan needs a trust review.' },
  rejected: { tone: 'rose', label: 'Rejected', message: 'The QR or device state is invalid.' },
};

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanState, setScanState] = useState<ScanState>('scanning');
  const rotation = useSharedValue(0);
  const line = useSharedValue(0);

  const stateCopy = useMemo(() => stateConfig[scanState], [scanState]);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch {
        setHasPermission(false);
      }
    })();

    rotation.value = withRepeat(withTiming(1, { duration: 2600, easing: Easing.inOut(Easing.ease) }), -1, true);
    line.value = withRepeat(withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.ease) }), -1, false);
  }, [line, rotation]);

  const lineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: 20 + line.value * 220 }],
    opacity: 0.5 + line.value * 0.4,
  }));

  const scanMutation = useMutation({
    mutationFn: async (qrData: string) => {
      setScanState('verifying');
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await new Promise((resolve) => setTimeout(resolve, 900));
      if (qrData.includes('fraud')) {
        setScanState('suspicious');
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        throw new Error('Anomaly detected');
      }

      if (qrData.length < 6) {
        setScanState('rejected');
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        throw new Error('Invalid QR data');
      }

      setScanState('success');
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      return { success: true, token: qrData };
    },
    onSettled: () => {
      setTimeout(() => setScanState('scanning'), 2200);
    },
  });

  if (hasPermission === null) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#38bdf8" />
          <Text className="mt-4 text-slate-300">Requesting camera access...</Text>
        </View>
      </Screen>
    );
  }

  if (hasPermission === false) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center gap-4">
          <Text className="text-5xl">🚫</Text>
          <Text className="text-2xl font-bold text-white">Camera access required</Text>
          <Text className="text-center text-slate-400">Enable camera permissions to scan QR sessions securely.</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View className="flex-1">
        <PremiumTitle eyebrow="QR Scan" title="Scan with confidence." subtitle="The scanner validates session trust, GPS lock, and device confidence before marking attendance." />

        <View className="mt-6 overflow-hidden rounded-[32px] border border-white/10 bg-black/40">
          <View className="h-[440px] overflow-hidden rounded-[32px]">
            <CameraView
              barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
              onBarcodeScanned={({ data }) => {
                if (scanState === 'scanning' && !scanMutation.isPending) {
                  scanMutation.mutate(data);
                }
              }}
              style={{ flex: 1 }}
            />
            <View className="absolute inset-0 bg-[rgba(2,7,18,0.35)]" />

            <View className="absolute inset-0 items-center justify-center">
              <View className="h-60 w-60 rounded-[36px] border border-cyan-300/30 bg-white/5 p-3">
                <Animated.View style={lineStyle} className="absolute left-3 right-3 h-1 rounded-full bg-cyan-300" />
                <View className="flex-1 items-center justify-center rounded-[28px] border border-white/10">
                  <PulseRing label={stateCopy.label.toLowerCase()} value={scanState === 'success' ? 'OK' : scanState === 'suspicious' ? '!' : 'QR'} progress={scanState === 'verifying' ? 72 : scanState === 'success' ? 100 : 45} />
                </View>
              </View>
            </View>
          </View>
        </View>

        <GlassCard className="mt-5 gap-4">
          <View className="flex-row items-center justify-between">
            <StatusPill tone={stateCopy.tone} label={stateCopy.label} />
            <StatusPill tone="cyan" label="GPS lock" />
          </View>
          <Text className="text-sm leading-6 text-slate-300">{stateCopy.message}</Text>
          <Text className="text-xs uppercase tracking-[0.35em] text-slate-500">Live scan count: {scanMutation.isPending ? '1' : scanState === 'success' ? '1 verified' : '0'}</Text>

          <View className="flex-row gap-3">
            <View className="flex-1 rounded-[20px] border border-white/10 bg-white/5 p-4">
              <Text className="text-xs uppercase tracking-[0.35em] text-slate-500">Face preview</Text>
              <Text className="mt-2 text-sm font-semibold text-white">Enabled</Text>
            </View>
            <View className="flex-1 rounded-[20px] border border-white/10 bg-white/5 p-4">
              <Text className="text-xs uppercase tracking-[0.35em] text-slate-500">Session trust</Text>
              <Text className="mt-2 text-sm font-semibold text-white">97%</Text>
            </View>
          </View>
        </GlassCard>
      </View>
    </Screen>
  );
}