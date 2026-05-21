import { router } from 'expo-router';
import { Text, TextInput, View } from 'react-native';
import { GlassCard, PrimaryButton, PremiumTitle, Screen } from '../../components/experience';
import { theme } from '@secure-attendance/ui';

export default function SignupScreen() {
  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 16 }}>
        <View style={{ gap: 24 }}>
          <PremiumTitle
            eyebrow="Institution onboarding"
            title="Create workspace access."
            subtitle="Set up your institution, trusted admin identity, and mobile device policy in a streamlined onboarding flow."
          />

          <GlassCard>
            <View style={{ gap: 16 }}>
              {['Institution name', 'Work email', 'Department', 'Region'].map((label) => (
                <TextInput
                  key={label}
                  style={{ borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.03)', paddingHorizontal: 16, paddingVertical: 16, color: theme.colors.text }}
                  placeholder={label}
                  placeholderTextColor={theme.colors.muted}
                />
              ))}
            </View>
          </GlassCard>
        </View>

        <View style={{ gap: 12 }}>
          <PrimaryButton title="Create account" onPress={() => router.replace('/(auth)/login' as never)} tone="emerald" />
          <Text style={{ textAlign: 'center', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.4, color: theme.colors.muted }}>Secure onboarding · mobile-first</Text>
        </View>
      </View>
    </Screen>
  );
}