import { router } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Screen, PulseRing } from '../components/experience';

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => router.replace('/(auth)/health' as never), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Screen>
      <View className="flex-1 items-center justify-center gap-8">
        <PulseRing label="booting" value="SA" progress={92} />
        <View className="items-center gap-2">
          <Text className="text-2xl font-bold text-white">Secure Attendance</Text>
          <Text className="text-sm text-slate-400">Operational trust layer starting up</Text>
        </View>
      </View>
    </Screen>
  );
}
