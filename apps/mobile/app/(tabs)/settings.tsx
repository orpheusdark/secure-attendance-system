import { ScrollView, Switch, Text, View } from 'react-native';
import { GlassCard, PremiumTitle, Screen, StatusPill } from '../../components/experience';

export default function SettingsScreen() {
  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-8">
        <View className="space-y-6">
          <PremiumTitle eyebrow="Settings" title="Security controls." subtitle="Fine-tune biometrics, device trust, and notification posture from the mobile control surface." />

          {[
            { label: 'Biometric lock', detail: 'Require biometric verification for sensitive actions.', enabled: true },
            { label: 'Fraud alerts', detail: 'Notify on suspicious scans and GPS anomalies.', enabled: true },
            { label: 'Quiet mode', detail: 'Reduce non-critical notifications during class.', enabled: false },
          ].map((item) => (
            <GlassCard key={item.label} className="gap-3">
              <View className="flex-row items-center justify-between">
                <View className="flex-1 pr-4">
                  <Text className="text-base font-semibold text-white">{item.label}</Text>
                  <Text className="mt-1 text-sm leading-6 text-slate-400">{item.detail}</Text>
                </View>
                <Switch value={item.enabled} trackColor={{ false: '#334155', true: '#0ea5e9' }} thumbColor={item.enabled ? '#ffffff' : '#e2e8f0'} />
              </View>
            </GlassCard>
          ))}

          <GlassCard>
            <StatusPill tone="emerald" label="dark mode primary" />
          </GlassCard>
        </View>
      </ScrollView>
    </Screen>
  );
}