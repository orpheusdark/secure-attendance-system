import { router } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Screen, PulseRing } from '../components/experience';
import { theme } from '@secure-attendance/ui';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => router.replace('/(auth)/health' as never), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Screen>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 32 }}>
        <PulseRing label="booting" value="SA" progress={92} />
        <View style={{ alignItems: 'center', gap: 8 }}>
          <Text style={{ fontSize: 24, fontWeight: '700', color: theme.colors.text }}>Secure Attendance</Text>
          <Text style={{ fontSize: 14, color: theme.colors.muted }}>Operational trust layer starting up</Text>
        </View>
      </View>
    </Screen>
  );
}
