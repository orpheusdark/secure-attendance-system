import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { GlassCard, PrimaryButton, Screen, StatusPill, PremiumTitle } from '../../components/experience';
import { theme } from '@secure-attendance/ui';

export default function OnboardingScreen() {
  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 16 }}>
        <View style={{ gap: 32 }}>
          <PremiumTitle
            eyebrow="Institution onboarding"
            title="Built for anti-fraud attendance."
            subtitle="Dynamic QR validation, geofence-aware checks, and real-time trust signals for every session."
          />

          <View style={{ gap: 16 }}>
            <GlassCard>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.text }}>Student flow</Text>
                <StatusPill tone="cyan" label="Secure" />
              </View>
              <Text style={{ marginTop: 8, fontSize: 14, lineHeight: 22, color: theme.colors.muted }}>Scan, verify, and review attendance history from one native screen.</Text>
            </GlassCard>
            <GlassCard>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: theme.colors.text }}>Teacher flow</Text>
                <StatusPill tone="emerald" label="Live" />
              </View>
              <Text style={{ marginTop: 8, fontSize: 14, lineHeight: 22, color: theme.colors.muted }}>Create sessions, rotate QR, and watch fraud intelligence in real time.</Text>
            </GlassCard>
          </View>
        </View>

        <View style={{ gap: 12 }}>
          <PrimaryButton title="Continue" onPress={() => router.replace('/(auth)/login' as never)} tone="sky" />
          <Text style={{ textAlign: 'center', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.4, color: theme.colors.muted }}>Premium mobile-first attendance ecosystem</Text>
        </View>
      </View>
    </Screen>
  );
}
