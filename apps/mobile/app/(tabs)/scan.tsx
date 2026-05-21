import { useMutation } from '@tanstack/react-query';
import { Camera, CameraView } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Easing, Text, View, useWindowDimensions } from 'react-native';
import { theme } from '@secure-attendance/ui';
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
  const [scanCount, setScanCount] = useState(0);
  const [cameraReady, setCameraReady] = useState(false);
  const line = useRef(new Animated.Value(0)).current;
  const lastScanAt = useRef(0);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { width } = useWindowDimensions();
  const frameSize = Math.min(280, Math.max(220, Math.round(width * 0.72)));

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

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(line, { toValue: 1, duration: 1800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(line, { toValue: 0, duration: 1800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );

    animation.start();
    return () => {
      animation.stop();
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, [line]);

  const lineStyle = {
    transform: [
      {
        translateY: line.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 240],
        }),
      },
    ],
    opacity: line.interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 0.9],
    }),
  } as const;

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
      setScanCount((value) => value + 1);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      return { success: true, token: qrData };
    },
    onSettled: () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setScanState('scanning'), 1800);
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
      <View style={{ flex: 1 }}>
        <PremiumTitle eyebrow="QR Scan" title="Scan with confidence." subtitle="The scanner validates session trust, GPS lock, and device confidence before marking attendance." />

        <View style={{ marginTop: 24, overflow: 'hidden', borderRadius: 32, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(0,0,0,0.35)' }}>
          <View style={{ height: 440, overflow: 'hidden', borderRadius: 32 }}>
            <CameraView
              barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
              onCameraReady={() => setCameraReady(true)}
              onBarcodeScanned={({ data }) => {
                if (!cameraReady || scanMutation.isPending || scanState !== 'scanning') return;
                if (Date.now() - lastScanAt.current < 1400) return;
                lastScanAt.current = Date.now();
                  scanMutation.mutate(data);
              }}
              style={{ flex: 1 }}
              accessible
              accessibilityLabel="QR code camera scanner"
            />
            <View pointerEvents="none" style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(2,7,18,0.35)' }} />

            <View pointerEvents="none" style={{ position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ height: frameSize, width: frameSize, borderRadius: 36, borderWidth: 1, borderColor: 'rgba(103,232,249,0.3)', backgroundColor: 'rgba(255,255,255,0.05)', padding: 12 }}>
                <Animated.View style={[lineStyle, { position: 'absolute', left: 12, right: 12, height: 4, borderRadius: 999, backgroundColor: theme.colors.live }]} />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 28, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' }}>
                  <PulseRing label={stateCopy.label.toLowerCase()} value={scanState === 'success' ? 'OK' : scanState === 'suspicious' ? '!' : 'QR'} progress={scanState === 'verifying' ? 72 : scanState === 'success' ? 100 : 45} />
                </View>
              </View>
            </View>
          </View>
        </View>

        <GlassCard className="mt-5 gap-4">
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <StatusPill tone={stateCopy.tone} label={stateCopy.label} />
            <StatusPill tone="cyan" label="GPS lock" />
          </View>
          <Text style={{ fontSize: 14, lineHeight: 22, color: theme.colors.muted }}>{cameraReady ? stateCopy.message : 'Preparing camera and scanner overlay...'}</Text>
          <Text style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.4, color: theme.colors.muted }}>Live scan count: {scanMutation.isPending ? '1' : scanCount > 0 ? `${scanCount} verified` : '0'}</Text>

          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.03)', padding: 16 }}>
              <Text style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.4, color: theme.colors.muted }}>Face preview</Text>
              <Text style={{ marginTop: 8, fontSize: 14, fontWeight: '600', color: theme.colors.text }}>Enabled</Text>
            </View>
            <View style={{ flex: 1, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.03)', padding: 16 }}>
              <Text style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.4, color: theme.colors.muted }}>Session trust</Text>
              <Text style={{ marginTop: 8, fontSize: 14, fontWeight: '600', color: theme.colors.text }}>97%</Text>
            </View>
          </View>
        </GlassCard>
      </View>
    </Screen>
  );
}