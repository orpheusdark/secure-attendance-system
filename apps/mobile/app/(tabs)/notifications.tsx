import { ScrollView, Text, View } from 'react-native';
import { GlassCard, PremiumTitle, Screen, StatusPill } from '../../components/experience';

const notifications = [
  { title: 'Fraud watch alert', message: 'Replay attempt blocked from unmanaged device.', tone: 'rose' as const },
  { title: 'QR refresh complete', message: 'Session board refreshed for Hall A.', tone: 'cyan' as const },
  { title: 'Attendance milestone', message: 'Business cohort crossed 95% attendance.', tone: 'emerald' as const },
];

export default function NotificationsScreen() {
  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-8">
        <View className="space-y-6">
          <PremiumTitle eyebrow="Notifications" title="Live updates." subtitle="Security alerts, QR refreshes, and attendance milestones stay readable at a glance." />

          {notifications.map((item) => (
            <GlassCard key={item.title} className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-base font-semibold text-white">{item.title}</Text>
                <StatusPill tone={item.tone} label={item.tone} />
              </View>
              <Text className="text-sm leading-6 text-slate-300">{item.message}</Text>
            </GlassCard>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}