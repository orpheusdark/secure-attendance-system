import { ScrollView, Text, View } from 'react-native';
import { GlassCard, PremiumTitle, Screen, StatusPill } from '../components/experience';

const history = [
  { session: 'Advanced UI Systems', status: 'Verified', time: '08:02' },
  { session: 'Security Architecture', status: 'Verified', time: '11:31' },
  { session: 'Product Analytics', status: 'Pending', time: '14:02' },
];

export default function AttendanceHistoryScreen() {
  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-8">
        <View className="space-y-6">
          <PremiumTitle eyebrow="History" title="Attendance history." subtitle="Review trusted, pending, and verified sessions with a clean native timeline." />

          {history.map((item) => (
            <GlassCard key={item.session} className="gap-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-base font-semibold text-white">{item.session}</Text>
                <StatusPill tone={item.status === 'Verified' ? 'emerald' : 'amber'} label={item.status} />
              </View>
              <Text className="text-sm text-slate-400">Marked at {item.time}</Text>
            </GlassCard>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}