import { router } from 'expo-router';
import { Text, View, Pressable } from 'react-native';

export default function SplashScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-[#07111f] px-6">
      <View className="mb-6 h-24 w-24 items-center justify-center rounded-3xl bg-cyan-400/15 border border-cyan-300/20">
        <Text className="text-3xl font-bold text-cyan-300">SA</Text>
      </View>
      <Text className="text-center text-4xl font-bold text-white">Secure Attendance</Text>
      <Text className="mt-3 max-w-sm text-center text-base text-slate-300">
        Anti-fraud attendance for institutions, classrooms, teams, and enterprise training.
      </Text>
      <Pressable
        className="mt-10 rounded-2xl bg-cyan-400 px-6 py-4"
        onPress={() => router.replace('/(auth)/login')}
      >
        <Text className="text-base font-semibold text-slate-950">Enter platform</Text>
      </Pressable>
    </View>
  );
}
