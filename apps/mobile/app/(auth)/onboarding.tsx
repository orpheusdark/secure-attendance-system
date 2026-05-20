import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { GlassCard, PrimaryButton, Screen, StatusPill, PremiumTitle } from '../../components/experience';

export default function OnboardingScreen() {
  return (
    <Screen>
      <View className="flex-1 justify-between py-4">
        <View className="space-y-8">
          <PremiumTitle
            eyebrow="Institution onboarding"
            title="Built for anti-fraud attendance."
            subtitle="Dynamic QR validation, geofence-aware checks, and real-time trust signals for every session."
          />

          <View className="gap-4">
            <GlassCard>
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-semibold text-white">Student flow</Text>
                <StatusPill tone="cyan" label="Secure" />
              </View>
              <Text className="mt-2 text-sm leading-6 text-slate-400">Scan, verify, and review attendance history from one native screen.</Text>
            </GlassCard>
            <GlassCard>
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-semibold text-white">Teacher flow</Text>
                <StatusPill tone="emerald" label="Live" />
              </View>
              <Text className="mt-2 text-sm leading-6 text-slate-400">Create sessions, rotate QR, and watch fraud intelligence in real time.</Text>
            </GlassCard>
          </View>
        </View>

        <View className="gap-3">
          <PrimaryButton title="Continue" onPress={() => router.replace('/(auth)/login' as never)} tone="sky" />
          <Text className="text-center text-xs uppercase tracking-[0.35em] text-slate-500">Premium mobile-first attendance ecosystem</Text>
        </View>
      </View>
    </Screen>
  );
}
