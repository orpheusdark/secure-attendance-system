import { ScrollView, Text, View } from 'react-native';
import { GlassCard, PremiumTitle, Screen, StatusPill } from '../components/experience';

const alerts = [
  { title: 'Replay attempt blocked', detail: 'Attempt reused an expired session token.', tone: 'rose' as const },
  { title: 'GPS mismatch', detail: 'Device drift detected outside the approved geofence.', tone: 'amber' as const },
  { title: 'Trust restored', detail: 'Session returned to green state after a fresh QR refresh.', tone: 'emerald' as const },
];

export default function FraudAlertsScreen() {
  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-8">
        <View className="space-y-6">
          <PremiumTitle eyebrow="Fraud alerts" title="Threat intelligence." subtitle="Review suspicious events with a tone system that feels serious without becoming noisy." />

          {alerts.map((item) => (
            <GlassCard key={item.title} className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-base font-semibold text-white">{item.title}</Text>
                <StatusPill tone={item.tone} label={item.tone} />
              </View>
              <Text className="text-sm leading-6 text-slate-300">{item.detail}</Text>
            </GlassCard>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}