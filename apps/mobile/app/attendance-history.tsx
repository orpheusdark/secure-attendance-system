import { ScrollView, Text, View } from 'react-native';
import { GlassCard, PremiumTitle, Screen, StatusPill } from '../components/experience';
import { theme } from '@secure-attendance/ui';

const history = [
  { session: 'Advanced UI Systems', status: 'Verified', time: '08:02' },
  { session: 'Security Architecture', status: 'Verified', time: '11:31' },
  { session: 'Product Analytics', status: 'Pending', time: '14:02' },
];

export default function AttendanceHistoryScreen() {
  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={{ gap: 24 }}>
          <PremiumTitle eyebrow="History" title="Attendance history." subtitle="Review trusted, pending, and verified sessions with a clean native timeline." />

          {history.map((item) => (
            <GlassCard key={item.session} className="gap-3">
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: theme.colors.text }}>{item.session}</Text>
                <StatusPill tone={item.status === 'Verified' ? 'emerald' : 'amber'} label={item.status} />
              </View>
              <Text style={{ fontSize: 14, color: theme.colors.muted }}>Marked at {item.time}</Text>
            </GlassCard>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}