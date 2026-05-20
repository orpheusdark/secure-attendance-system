import { router } from 'expo-router';
import { Text, TextInput, View } from 'react-native';
import { GlassCard, PrimaryButton, PremiumTitle, Screen } from '../../components/experience';

export default function SignupScreen() {
  return (
    <Screen>
      <View className="flex-1 justify-between py-4">
        <View className="space-y-6">
          <PremiumTitle
            eyebrow="Institution onboarding"
            title="Create workspace access."
            subtitle="Set up your institution, trusted admin identity, and mobile device policy in a streamlined onboarding flow."
          />

          <GlassCard>
            <View className="gap-4">
              {['Institution name', 'Work email', 'Department', 'Region'].map((label) => (
                <TextInput key={label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white" placeholder={label} placeholderTextColor="#94a3b8" />
              ))}
            </View>
          </GlassCard>
        </View>

        <View className="gap-3">
          <PrimaryButton title="Create account" onPress={() => router.replace('/(auth)/login' as never)} tone="emerald" />
          <Text className="text-center text-xs uppercase tracking-[0.35em] text-slate-500">Secure onboarding · mobile-first</Text>
        </View>
      </View>
    </Screen>
  );
}