import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { GlassCard, PrimaryButton, PremiumTitle, Screen, StatusPill } from '../../components/experience';

export default function ProfileScreen() {
  return (
    <Screen>
      <View className="flex-1 justify-between py-4">
        <View className="space-y-6">
          <PremiumTitle eyebrow="Profile" title="Trust profile." subtitle="Manage your attendance history, settings, and fraud alerts from one clean mobile surface." />

          <GlassCard>
            <View className="space-y-3">
              <Text className="text-lg font-semibold text-white">Amina Yusuf</Text>
              <Text className="text-sm text-slate-400">amina@nexus.edu</Text>
              <View className="flex-row gap-2">
                <StatusPill tone="emerald" label="verified" />
                <StatusPill tone="cyan" label="trusted device" />
              </View>
            </View>
          </GlassCard>

          <View className="gap-3">
            <Pressable onPress={() => router.push('/attendance-history' as never)} className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4">
              <Text className="text-white">Attendance history</Text>
            </Pressable>
            <Pressable onPress={() => router.push('/fraud-alerts' as never)} className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4">
              <Text className="text-white">Fraud alerts</Text>
            </Pressable>
            <Pressable onPress={() => router.push('/(tabs)/settings' as never)} className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4">
              <Text className="text-white">Settings</Text>
            </Pressable>
          </View>
        </View>

        <PrimaryButton title="Sign out" onPress={() => router.replace('/(auth)/login' as never)} tone="rose" />
      </View>
    </Screen>
  );
}