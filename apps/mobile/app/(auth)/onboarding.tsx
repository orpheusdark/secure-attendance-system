import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function OnboardingScreen() {
  return (
    <View className="flex-1 bg-[#05111c] px-6 pt-24">
      <Text className="text-4xl font-bold text-white">Built for anti-fraud attendance</Text>
      <Text className="mt-4 text-slate-300">
        Dynamic QR, location validation, liveness checks, and real-time monitoring for each session.
      </Text>
      <View className="mt-8 gap-4">
        <View className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <Text className="text-lg font-semibold text-white">Student app</Text>
          <Text className="mt-2 text-slate-400">Scan, verify, and review attendance analytics.</Text>
        </View>
        <View className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <Text className="text-lg font-semibold text-white">Teacher console</Text>
          <Text className="mt-2 text-slate-400">Create sessions, lock attendance, and watch fraud signals.</Text>
        </View>
      </View>
      <Pressable className="mt-10 rounded-2xl bg-cyan-400 px-5 py-4" onPress={() => router.replace('/(auth)/login')}>
        <Text className="text-center font-semibold text-slate-950">Continue</Text>
      </Pressable>
    </View>
  );
}
